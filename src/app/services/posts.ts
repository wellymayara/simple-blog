import apiClient from "../configs/api";
import { Post, Author } from "./types";

class PostService {
  getAllPosts = async () => {
    const response = await apiClient.get<Post[]>("/posts");
    return response.data;
  };

  getAuthors = async () => {
    const response = await apiClient.get<Author[]>("/author");
    return response.data;
  };
}

export default new PostService();
