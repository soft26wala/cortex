import { NextRequest, NextResponse } from "next/server";
import { verifyJeenuAdminAuth } from "@/lib/jeenusoni/permissions";
import { updateJeenuProfile, createJeenuGallery, initDb } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

/**
 * POST /api/vlog/jeenusoni/upload
 * Secure picture upload endpoint for Jeenu Soni Profile & Lookbook Gallery.
 * Strictly restricted: Only users with ADMIN or SONI role can upload pictures.
 * Uploads to Cloudinary (using credentials from .env) with local disk & base64 fallbacks.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Authorization Verification (ADMIN or SONI roles only)
    const auth = await verifyJeenuAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json(
        {
          success: false,
          error: auth.error || "Access Denied: Only ADMIN and SONI roles are authorized to upload pictures.",
        },
        { status: auth.status || 403 }
      );
    }

    // 2. Parse Multipart Form Data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const uploadType = (formData.get("type") as string || "profile").toLowerCase().trim(); // "profile" | "gallery"
    const title = (formData.get("title") as string || "").trim();
    const caption = (formData.get("caption") as string || "").trim();
    const sortOrder = Number(formData.get("sortOrder") || 1);

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided for upload." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Upload to Cloudinary using .env credentials
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "devpogl5m";
    const apiKey = process.env.CLOUDINARY_API_KEY || "361156576179645";
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "fzeQkQb4yNYryphQ2n6b002QUnk";

    let finalImageUrl: string | null = null;
    let uploadProvider = "local";

    if (cloudName && apiKey && apiSecret) {
      try {
        const timestamp = Math.round(Date.now() / 1000);
        const params: Record<string, string> = {
          timestamp: timestamp.toString(),
        };

        if (uploadType === "profile") {
          params.invalidate = "true";
          params.overwrite = "true";
          params.public_id = "jeenu_profile_latest";
          params.tags = "jeenu_profile,jeenusoni";
        } else {
          params.public_id = `jeenu_gallery_${Date.now()}`;
          params.tags = "jeenu_gallery,jeenusoni";
        }

        const sortedKeys = Object.keys(params).sort();
        const strToSign = sortedKeys.map((k) => `${k}=${params[k]}`).join("&") + apiSecret;
        const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

        const cData = new FormData();
        const fileBlob = new Blob([buffer], { type: file.type || "image/jpeg" });
        cData.append("file", fileBlob, file.name);
        cData.append("api_key", apiKey);
        for (const [k, v] of Object.entries(params)) {
          cData.append(k, v);
        }
        cData.append("signature", signature);

        const cRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: cData,
        });

        const cJson = await cRes.json();
        if (cJson.secure_url) {
          finalImageUrl = cJson.secure_url;
          uploadProvider = "cloudinary";
        } else {
          console.warn("Cloudinary upload response warning:", cJson);
        }
      } catch (cloudErr) {
        console.warn("Cloudinary upload exception, falling back:", cloudErr);
      }
    }

    // 4. Local Disk Fallback
    if (!finalImageUrl) {
      try {
        const uploadsDir = path.join(process.cwd(), "public", "uploads", "jeenusoni");
        await mkdir(uploadsDir, { recursive: true });

        const filename = `${uploadType}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const filePath = path.join(uploadsDir, filename);

        await writeFile(filePath, buffer);
        finalImageUrl = `/uploads/jeenusoni/${filename}`;
        uploadProvider = "local";
      } catch (fsErr) {
        console.warn("Local disk write fallback failed:", fsErr);
      }
    }

    // 5. Bulletproof Base64 Data URL Fallback
    if (!finalImageUrl) {
      const mimeType = file.type || "image/jpeg";
      finalImageUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
      uploadProvider = "base64";
    }

    // 6. Automatically Save to PostgreSQL Database
    await initDb();

    if (uploadType === "profile") {
      // Update profileImage in PostgreSQL and memory store
      const updatedProfile = await updateJeenuProfile({ profileImage: finalImageUrl }, "jeenusoni");

      return NextResponse.json({
        success: true,
        type: "profile",
        url: finalImageUrl,
        provider: uploadProvider,
        message: "Profile picture uploaded and updated successfully!",
        data: updatedProfile,
      });
    } else {
      // Direct PostgreSQL INSERT for Gallery Item
      const newGalleryItem = await createJeenuGallery({
        imageUrl: finalImageUrl,
        title: title || "Lookbook Moment",
        caption: caption || "",
        sortOrder,
        published: true,
      });

      return NextResponse.json({
        success: true,
        type: "gallery",
        url: finalImageUrl,
        provider: uploadProvider,
        message: "Photo added to lookbook gallery successfully!",
        data: newGalleryItem,
      });
    }
  } catch (error: any) {
    console.error("Jeenu Soni upload API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process image upload." },
      { status: 500 }
    );
  }
}
