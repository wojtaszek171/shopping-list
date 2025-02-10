export interface User {
  fullname: string;
  email: string;
  username: string;
  password: string;
  createdDate?: Date;
}

export interface TokenResponse {
  accessToken: string;
}

export interface SessionResponse {
  message: string;
  user: {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    __v: 0;
  };
}

export interface ListResponse {
  id: string;
  name: string;
  items: string[];
  ownerIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
