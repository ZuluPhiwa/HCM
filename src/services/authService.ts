import { Auth, AuthResponse } from "../models/auth";
import { ServerResponse } from "../models/serverResponse";
import { User } from "../models/user";
import { publicApi } from "../utility/api";

export const AuthService = {
  login: async (credentials: Auth) => {
    const response: ServerResponse<AuthResponse> = await publicApi.post('/login', credentials);
    // Error or success mesage. Same format applies on all endpoints only thing changes is the type of data returned
    const message = response.message;
    const result = response.data;

    if (result?.token) {
      localStorage.setItem('token', result.token);
    }

    return result;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};