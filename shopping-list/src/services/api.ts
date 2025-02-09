import { SessionResponse, TokenResponse, User } from "./types";

const API_HOST = import.meta.env.VITE_API_HOST;

export const signUp = async (user: User): Promise<User> => {
  const response = await fetch(`${API_HOST}/v1/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  return response.json();
};

export const signIn = async (
  user: Pick<User, "username" | "password">,
): Promise<TokenResponse> => {
  const response = await fetch(`${API_HOST}/v1/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  return response.json();
};

export const signOut = async (): Promise<void> => {
  await fetch(`${API_HOST}/v1/user/signout`, {
    method: "POST",
    credentials: "include",
  });
};

export const checkSession = async (): Promise<SessionResponse> => {
  const response = await fetch(`${API_HOST}/v1/user/session`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};
