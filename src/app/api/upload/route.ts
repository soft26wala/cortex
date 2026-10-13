import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // -------------------------------------------------------------------------
    // 1. CLOUDINARY SIGNED UPLOAD (Primary Cloud Storage for Vercel & Production)
    // -------------------------------------------------------------------------
    const cloudName =
      (formData.get("cloudName") as string) ||
      process.env.CLOUDINARY_CLOUD_NAME ||
      "devpogl5m";
    const apiKey =
      (formData.get("apiKey") as string) ||
      process.env.CLOUDINARY_API_KEY ||
      "361156576179645";
    const apiSecret =
      (formData.get("apiSecret") as string) ||
      process.env.CLOUDINARY_API_SECRET ||
      "fzeQkQb4yNYryphQ2n6b002QUnk";

    if (cloudName && apiKey && apiSecret) {
      try {
        const timestamp = Math.round(Date.now() / 1000);
        const signature = crypto
          .createHash("sha1")
          .update(`timestamp=${timestamp}${apiSecret}`)
          .digest("hex");

        const cData = new FormData();
        // Create Blob from buffer to upload
        const fileBlob = new Blob([buffer], { type: file.type || "image/jpeg" });
        cData.append("file", fileBlob, file.name);
        cData.append("api_key", apiKey);
        cData.append("timestamp", timestamp.toString());
        cData.append("signature", signature);

        const cRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: cData,
        });

        const cJson = await cRes.json();
        if (cJson.secure_url) {
          return NextResponse.json({
            success: true,
            url: cJson.secure_url,
            provider: "cloudinary",
          });
        } else {
          console.warn("Cloudinary signed upload error response:", cJson);
        }
      } catch (cloudErr) {
        console.warn("Cloudinary direct API upload exception:", cloudErr);
      }
    }

    // -------------------------------------------------------------------------
    // 2. LOCAL DISK STORAGE (For localhost / traditional VPS with write permissions)
    // -------------------------------------------------------------------------
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      const filename = `img_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadsDir, filename);

      await writeFile(filePath, buffer);
      const publicUrl = `/uploads/${filename}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        provider: "local",
      });
    } catch (fsErr: any) {
      // EROFS (Read-only file system) happens on Vercel/AWS Lambda serverless environments
      console.warn("Local disk write failed (expected on Vercel read-only system):", fsErr.message);
    }

    // -------------------------------------------------------------------------
    // 3. BULLETPROOF BASE64 DATA URL FALLBACK (Works anywhere without server writes)
    // -------------------------------------------------------------------------
    const mimeType = file.type || "image/jpeg";
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      provider: "base64",
      message: "Uploaded as embedded data URL",
    });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
