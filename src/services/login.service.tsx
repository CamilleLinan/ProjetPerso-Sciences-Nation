import axios from "axios";

const clientHTTP = axios.create({
  baseURL: "http://localhost:5011",
});

const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const res = await clientHTTP.post(`/api/user/create`, { firstName, lastName, email, password });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        throw new Error("User not found");
      } else if (err.response?.status === 409) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error("An internal error occurred");
      }
    }
    throw new Error("An unexpected error occurred");
  }
}

const signIn = async (email: string, password: string) => {
  try {
    const response = await clientHTTP.post(`/api/user/login`, { email: email, password: password });
    const data = response.data;
    if (data.body && data.body.token) {
      clientHTTP.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.body.token}`;
    }
    return { success: true, data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return {
          success: false,
          error: "L'email ou le mot de passe est incorrect",
        };
      } else {
        return {
          success: false,
          error: "Une erreur interne est survenue",
        };
      }
    }
  }
};

export default { signUp, signIn };