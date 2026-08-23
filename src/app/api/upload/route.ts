import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const customCloudName = (formData.get("cloudName") as string) || process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = (formData.get("uploadPreset") as string) || process.env.CLOUDINARY_UPLOAD_PRESET || "cortex_preset";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    // Try Cloudinary API upload if cloud name is provided or available
    if (customCloudName) {
      try {
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", file);
        cloudinaryData.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${customCloudName}/image/upload`, {
          method: "POST",
          body: cloudinaryData,
        });

        const data = await res.json();
        if (data.secure_url) {
          return NextResponse.json({
            success: true,
            url: data.secure_url,
            provider: "cloudinary",
          });
        }
      } catch (cloudErr) {
        console.warn("Cloudinary direct API upload warning:", cloudErr);
      }
    }

    // Fallback: Save file locally to /public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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
      message: "Uploaded locally. You can also paste your Cloudinary URL directly.",
    });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
