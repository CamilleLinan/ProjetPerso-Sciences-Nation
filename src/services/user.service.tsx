import axios from "axios";
import { User } from "../models/user.model";

const clientHTTP = axios.create({
  baseURL: "http://localhost:5011",
});

const getUserById = async (id: string): Promise<User | undefined> => {
  try {
    const response = await clientHTTP.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("User not found");
      }
    }
    throw new Error("An unexpected error occurred");
  }
};

export default { getUserById };
