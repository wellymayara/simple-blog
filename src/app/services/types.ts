export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  publishDate: string;
}

export interface Author {
  id: number;
  name: string;
  lastName: string;
  email: string;
  photoProfile: string;
  registeredIn: string;
}
