import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import { getAllPosts, postsDirectory } from "@/utils/markdown";

export async function GET() {
  try {
    const posts = getAllPosts([
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
    const body = await req.json();
    const {
      title,
      slug: userSlug,
      excerpt,
      coverImage,
      image2,
      image3,
      category,
      author,
      subtitles,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: "Blog Title is required." },
        { status: 400 }
      );
    }

    if (!coverImage?.trim()) {
      return NextResponse.json(
        { success: false, error: "Main Cover Image (Image 1) is required." },
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

    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // Check collision and make unique
    let finalSlug = baseSlug;
    let targetPath = join(postsDirectory, `${finalSlug}.mdx`);
    if (fs.existsSync(targetPath)) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      targetPath = join(postsDirectory, `${finalSlug}.mdx`);
    }

    const today = new Date().toISOString().split("T")[0];
    const authorName = author?.trim() || "Cortex Engineering";
    const postCategory = category?.trim() || "Web & Architecture";
    const postExcerpt = excerpt?.trim() || title;

    // Build subtitle sections in Markdown
    let bodyContent = `\n# ${title}\n\n${postExcerpt}\n\n`;

    const subsList = Array.isArray(subtitles) ? subtitles : [];

    subsList.forEach((sub: { title: string; content: string }, index: number) => {
      if (sub.title?.trim() || sub.content?.trim()) {
        bodyContent += `## ${sub.title.trim()}\n\n${sub.content.trim()}\n\n`;
      }

      // Embed Image 2 after first subtitle
      if (index === 0 && image2?.trim()) {
        bodyContent += `![Section Image](${image2.trim()})\n\n`;
      }

      // Embed Image 3 after second subtitle
      if (index === 1 && image3?.trim()) {
        bodyContent += `![Supporting Image](${image3.trim()})\n\n`;
      }
    });

    // If Image 2 or Image 3 were not placed yet (e.g. fewer subtitles), append them
    if (subsList.length < 1 && image2?.trim()) {
      bodyContent += `![Section Image](${image2.trim()})\n\n`;
    }
    if (subsList.length < 2 && image3?.trim()) {
      bodyContent += `![Supporting Image](${image3.trim()})\n\n`;
    }

    // Format clean frontmatter
    const serializedSubtitles = JSON.stringify(subsList).replace(/\\/g, "\\\\");

    const mdxContent = `---
title: "${title.replace(/"/g, '\\"')}"
excerpt: "${postExcerpt.replace(/"/g, '\\"')}"
date: ${today}
coverImage: "${coverImage.trim()}"
image2: "${(image2 || "").trim()}"
image3: "${(image3 || "").trim()}"
author: "${authorName.replace(/"/g, '\\"')}"
authorImage: "/images/blogdetail-page/silicaman.png"
category: "${postCategory.replace(/"/g, '\\"')}"
subtitlesData: '${serializedSubtitles}'
---
${bodyContent}`;

    fs.writeFileSync(targetPath, mdxContent, "utf8");

    // Also persist in data/customBlogs.json for backup/easy retrieval
    const dataDir = join(process.cwd(), "src/data");
    const jsonPath = join(dataDir, "customBlogs.json");
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      let currentList: any[] = [];
      if (fs.existsSync(jsonPath)) {
        currentList = JSON.parse(fs.readFileSync(jsonPath, "utf8") || "[]");
      }
      currentList.unshift({
        slug: finalSlug,
        title,
        excerpt: postExcerpt,
        date: today,
        coverImage: coverImage.trim(),
        image2: (image2 || "").trim(),
        image3: (image3 || "").trim(),
        category: postCategory,
        author: authorName,
        subtitles: subsList,
      });
      fs.writeFileSync(jsonPath, JSON.stringify(currentList, null, 2), "utf8");
    } catch (e) {
      console.warn("Notice: customBlogs.json backup skipped:", e);
    }

    return NextResponse.json({
      success: true,
      slug: finalSlug,
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

