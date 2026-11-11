import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path, { join } from "path";
import crypto from "crypto";
import { getAllPosts, postsDirectory } from "@/utils/markdown";
import { createCustomBlog, getAllCustomBlogs } from "@/lib/db";

const BACKEND_BASE = (
  process.env.NEXT_PUBLIC_API || "https://cortex-api-htc8.onrender.com/"
).replace(/\/+$/, "");

// Helper to save uploaded image file (Cloudinary with local disk & base64 fallback)
async function saveUploadedFile(
  fileOrUrl: any,
  prefix: string
): Promise<string | null> {
  if (!fileOrUrl) return null;

  // If it's already a string URL
  if (typeof fileOrUrl === "string") {
    return fileOrUrl.trim() || null;
  }

  // If it's a File / Blob
  if (typeof fileOrUrl.arrayBuffer === "function") {
    const file = fileOrUrl as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try Cloudinary first (works on Vercel & production serverless)
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "devpogl5m";
    const apiKey = process.env.CLOUDINARY_API_KEY || "361156576179645";
    const apiSecret =
      process.env.CLOUDINARY_API_SECRET || "fzeQkQb4yNYryphQ2n6b002QUnk";

    if (cloudName && apiKey && apiSecret) {
      try {
        const timestamp = Math.round(Date.now() / 1000);
        const params: Record<string, string> = {
          timestamp: timestamp.toString(),
          folder: "cortex_blogs",
        };
        const sortedKeys = Object.keys(params).sort();
        const strToSign =
          sortedKeys.map((k) => `${k}=${params[k]}`).join("&") + apiSecret;
        const signature = crypto
          .createHash("sha1")
          .update(strToSign)
          .digest("hex");

        const cData = new FormData();
        const fileBlob = new Blob([buffer], {
          type: file.type || "image/jpeg",
        });
        cData.append("file", fileBlob, file.name);
        cData.append("api_key", apiKey);
        for (const [k, v] of Object.entries(params)) {
          cData.append(k, v);
        }
        cData.append("signature", signature);

        const cRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: cData,
          }
        );

        const cJson = await cRes.json();
        if (cJson.secure_url) {
          return cJson.secure_url;
        }
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, falling back:", cloudErr);
      }
    }

    // 2. Local Disk Fallback (for local Node server)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "blogs");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${prefix}_${Date.now()}_${safeName}`;
      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, buffer);
      return `/uploads/blogs/${filename}`;
    } catch (fsErr) {
      console.warn("Local disk write skipped (likely read-only serverless):", fsErr);
      // 3. Base64 Fallback
      const b64 = buffer.toString("base64");
      return `data:${file.type || "image/jpeg"};base64,${b64}`;
    }
  }

  return null;
}

export async function GET() {
  try {
    const mdPosts = getAllPosts([
      "title",
      "date",
      "excerpt",
      "coverImage",
      "image2",
      "image3",
      "category",
      "author",
      "slug",
    ]);

    const dbPosts = await getAllCustomBlogs().catch(() => []);

    // Try fetching from Render backend too (non-blocking if offline)
    let remotePosts: any[] = [];
    try {
      const rRes = await fetch(`${BACKEND_BASE}/api/blogs`, {
        next: { revalidate: 10 },
      });
      if (rRes.ok) {
        const rData = await rRes.json();
        if (Array.isArray(rData.posts)) remotePosts = rData.posts;
      }
    } catch {
      // ignore if backend doesn't have /api/blogs deployed yet
    }

    // Merge and deduplicate by slug (newest first)
    const map = new Map<string, any>();
    [...remotePosts, ...dbPosts, ...mdPosts].forEach((p) => {
      if (p?.slug && !map.has(p.slug)) {
        map.set(p.slug, p);
      }
    });

    const posts = Array.from(map.values()).sort((a, b) => {
      const d1 = new Date(a.date || a.createdAt || 0).getTime();
      const d2 = new Date(b.date || b.createdAt || 0).getTime();
      return d2 - d1;
    });

    return NextResponse.json({ success: true, posts });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let title = "";
    let userSlug = "";
    let excerpt = "";
    let category = "";
    let author = "";
    let subtitles: any[] = [];
    let coverImageVal: string | null = null;
    let image2Val: string | null = null;
    let image3Val: string | null = null;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      title = (formData.get("title") as string) || "";
      userSlug = (formData.get("slug") as string) || "";
      excerpt = (formData.get("excerpt") as string) || "";
      category = (formData.get("category") as string) || "";
      author = (formData.get("author") as string) || "";

      const rawSubtitles = formData.get("subtitles");
      if (rawSubtitles) {
        try {
          subtitles = JSON.parse(rawSubtitles as string);
        } catch {
          subtitles = [];
        }
      }

      const coverFile = formData.get("coverImageFile");
      const coverUrl = formData.get("coverImage");
      coverImageVal = await saveUploadedFile(coverFile || coverUrl, "cover");

      const img2File = formData.get("image2File");
      const img2Url = formData.get("image2");
      image2Val = await saveUploadedFile(img2File || img2Url, "sec1");

      const img3File = formData.get("image3File");
      const img3Url = formData.get("image3");
      image3Val = await saveUploadedFile(img3File || img3Url, "sec2");
    } else {
      const body = await req.json();
      title = body.title || "";
      userSlug = body.slug || "";
      excerpt = body.excerpt || "";
      category = body.category || "";
      author = body.author || "";
      subtitles = body.subtitles || [];
      coverImageVal = body.coverImage || null;
      image2Val = body.image2 || null;
      image3Val = body.image3 || null;
    }

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: "Blog Title is required." },
        { status: 400 }
      );
    }

    if (!coverImageVal?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Main Cover Image (Image 1) is required. Please upload an image file.",
        },
        { status: 400 }
      );
    }

    // Generate clean slug
    let baseSlug = (userSlug || title)
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!baseSlug) {
      baseSlug = `blog-${Date.now()}`;
    }

    let finalSlug = baseSlug;
    try {
      if (fs.existsSync(join(postsDirectory, `${finalSlug}.mdx`))) {
        finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      }
    } catch {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const today = new Date().toISOString().split("T")[0];
    const authorName = author?.trim() || "Author";
    const postCategory = category?.trim() || "IT & Software";
    const postExcerpt = excerpt?.trim() || title;
    const subsList = Array.isArray(subtitles) ? subtitles : [];

    // 1. Save to PostgreSQL / In-Memory DB
    const savedBlog = await createCustomBlog({
      slug: finalSlug,
      title: title.trim(),
      excerpt: postExcerpt,
      category: postCategory,
      author: authorName,
      coverImage: coverImageVal.trim(),
      image2: (image2Val || "").trim(),
      image3: (image3Val || "").trim(),
      subtitles: subsList,
      date: today,
    });

    // 2. Sync to Render Backend PostgreSQL (safe non-fatal)
    try {
      await fetch(`${BACKEND_BASE}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedBlog),
      });
    } catch {
      // ignore if backend doesn't have /api/blogs deployed yet
    }

    // 3. Save local .mdx file & customBlogs.json (safe on read-only serverless)
    try {
      if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
      }
      const targetPath = join(postsDirectory, `${finalSlug}.mdx`);

      let bodyContent = `\n# ${title.trim()}\n\n${postExcerpt}\n\n`;
      subsList.forEach((sub: { title: string; content: string }, index: number) => {
        if (sub.title?.trim() || sub.content?.trim()) {
          bodyContent += `## ${sub.title.trim()}\n\n${sub.content.trim()}\n\n`;
        }
        if (index === 0 && image2Val?.trim()) {
          bodyContent += `![Section Image](${image2Val.trim()})\n\n`;
        }
        if (index === 1 && image3Val?.trim()) {
          bodyContent += `![Supporting Image](${image3Val.trim()})\n\n`;
        }
      });
      if (subsList.length < 1 && image2Val?.trim()) {
        bodyContent += `![Section Image](${image2Val.trim()})\n\n`;
      }
      if (subsList.length < 2 && image3Val?.trim()) {
        bodyContent += `![Supporting Image](${image3Val.trim()})\n\n`;
      }

      const serializedSubtitles = JSON.stringify(subsList).replace(/\\/g, "\\\\");
      const mdxContent = `---
title: "${title.trim().replace(/"/g, '\\"')}"
excerpt: "${postExcerpt.replace(/"/g, '\\"')}"
date: ${today}
coverImage: "${coverImageVal.trim()}"
image2: "${(image2Val || "").trim()}"
image3: "${(image3Val || "").trim()}"
author: "${authorName.replace(/"/g, '\\"')}"
authorImage: "/images/blogdetail-page/silicaman.png"
category: "${postCategory.replace(/"/g, '\\"')}"
subtitlesData: '${serializedSubtitles}'
---
${bodyContent}`;

      fs.writeFileSync(targetPath, mdxContent, "utf8");

      const dataDir = join(process.cwd(), "src/data");
      const jsonPath = join(dataDir, "customBlogs.json");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      let currentList: any[] = [];
      if (fs.existsSync(jsonPath)) {
        currentList = JSON.parse(fs.readFileSync(jsonPath, "utf8") || "[]");
      }
      currentList.unshift(savedBlog);
      fs.writeFileSync(jsonPath, JSON.stringify(currentList, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("Local MDX write skipped (read-only environment):", fsErr);
    }

    return NextResponse.json({
      success: true,
      slug: finalSlug,
      blog: savedBlog,
      message: "Blog post successfully published!",
    });
  } catch (err: any) {
    console.error("Error creating blog post:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create blog post" },
      { status: 500 }
    );
  }
}
