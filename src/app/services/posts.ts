import apiClient from "../configs/api";
import { Post, Author } from "./types";

class PostService {
  getAllPosts = async (page: number) => {
    console.log(page);
    const response = await apiClient.get<Post[]>(`/posts?page=${page}&size=8`);
    return response.data;
  };

  getAuthors = async () => {
    const response = await apiClient.get<Author[]>("/author");
    return response.data;
  };

  getCategories = async () => {
    return (await apiClient.get("/posts/category")).data;
  };

  getPostsByCategory = async (category: string) => {
    console.log("getPostsByCategory", category);
    return (await apiClient.get(`/posts/category/${category}`)).data;
  };
}

export default new PostService();
