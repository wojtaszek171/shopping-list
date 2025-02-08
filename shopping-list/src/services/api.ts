import { TokenResponse, User } from './types';

const API_HOST = process.env.API_HOST;

export const signUp = async (user: User): Promise<User> => {
  const response = await fetch(`${API_HOST}/v1/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const signIn = async (user: User): Promise<TokenResponse> => {
  const response = await fetch(`${API_HOST}/v1/user/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};
