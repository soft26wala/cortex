import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// Locate the markdown blog directory reliably
const resolveBlogDir = () => {
  const possiblePaths = [
    join(process.cwd(), "markdown/Blog"),
    join(process.cwd(), "client/markdown/Blog"),
    "C:/myProject/Cortex_web_solutions/client/markdown/Blog",
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return join(process.cwd(), "markdown/Blog");
};

export const postsDirectory = resolveBlogDir();

export function getPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs
      .readdirSync(postsDirectory)
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
  } catch (err) {
    console.error("Error reading post slugs:", err);
    return [];
  }
}

export function getPostBySlug(slug: string, fields: string[] = []): any {
  try {
    const realSlug = slug.replace(/\.(mdx|md)$/, "");
    const fullPathMdx = join(postsDirectory, `${realSlug}.mdx`);
    const fullPathMd = join(postsDirectory, `${realSlug}.md`);
    
    let fullPath = fullPathMdx;
    if (!fs.existsSync(fullPathMdx) && fs.existsSync(fullPathMd)) {
      fullPath = fullPathMd;
    }
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    function processImages(rawContent: string) {
      return rawContent.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-2xl my-6 w-full shadow-lg" />');
    }

    // If no specific fields requested, expose everything
    if (fields.length === 0) {
      return {
        slug: realSlug,
        content: processImages(content),
        rawContent: content,
        ...data,
      };
    }

    const items: Record<string, any> = {};

    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = realSlug;
      } else if (field === "content") {
        items[field] = processImages(content);
      } else if (field === "rawContent") {
        items[field] = content;
      } else if (field === "metadata") {
        items[field] = { ...data, coverImage: data.coverImage || null };
      } else if (typeof data[field] !== "undefined") {
        items[field] = data[field];
      }
    });

    return items;
  } catch (err) {
    console.error(`Error reading post by slug ${slug}:`, err);
    return null;
  }
}

export function getAllPosts(fields: string[] = []): any[] {
  try {
    const slugs = getPostSlugs();
    const posts = slugs
      .map((slug) => getPostBySlug(slug, fields))
      .filter(Boolean)
      .sort((post1, post2) => {
        const d1 = new Date(post1.date || 0).getTime();
        const d2 = new Date(post2.date || 0).getTime();
        return d2 - d1;
      });

    return posts;
  } catch (err) {
    console.error("Error reading all posts:", err);
    return [];
  }
}
