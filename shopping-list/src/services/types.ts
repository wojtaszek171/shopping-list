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
  _id: string;
  name: string;
  createdDate: Date;
  users: User[];
  __v: number;
  totalProducts: number;
  boughtProducts: number;
}
