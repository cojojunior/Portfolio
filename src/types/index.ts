export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  category: "web" | "graphics" ;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  username: string;
  password: string;
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


export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features: string[];
  price?: string;
  category: "frontend" | "uiux" | "graphics";
  created_at?: string;
}
