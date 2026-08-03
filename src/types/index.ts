export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  category: "web" | "graphics" | "mobile";
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: "web-dev" | "design" | "tutorials" | "thoughts";
  tags: string[];
}
