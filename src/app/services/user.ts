import axios from 'axios';
import User from '../interfaces/user'

const API_URL = 'https://api-dkviu3xq7a-uc.a.run.app/user';

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (userData: User) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  const body = {id, ...userData}
  try {
    const response = await axios.put(`${API_URL}`, body);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUserFirebase = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}`, { data: { id: id } });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}s`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};