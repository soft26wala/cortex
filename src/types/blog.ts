export interface BlogSubtitle {
  title: string;
  content: string;
}

export type Blog = {
  id?: number | string;
  title?: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  image2?: string;
  image3?: string;
  subtitles?: BlogSubtitle[];
  content?: string;
  author?: string;
  authorImage?: string;
  category?: string;
  date: string;
};
