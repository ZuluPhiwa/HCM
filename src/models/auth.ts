import { User } from "./user";

export interface Auth {
    username?: string;
    email?: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User
}