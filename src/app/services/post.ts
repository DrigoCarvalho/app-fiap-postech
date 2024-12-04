import axios from "axios";
import Post from "../interfaces/post";

const API_URL = "https://api-dkviu3xq7a-uc.a.run.app/post";

export const getPost = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}?postId=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createPost = async (userData: Partial<Post>) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (id: string, userData: Partial<Post>) => {
  const body = { id, ...userData };
  try {
    const response = await axios.put(`${API_URL}`, body);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}`, { data: { id: id } });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}s`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};
