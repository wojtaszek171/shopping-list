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
  _id: string;
  fullname: string;
  username: string;
  email: string;
  __v: 0;
}

export interface ListResponse {
  _id: string;
  name: string;
  createdDate: Date;
  users: User[];
  __v: number;
  allProductsCount: number;
  completedProductsCount: number;
}

export interface Product {
  _id: string;
  name: string;
  quantity: number;
  category: string;
  unit: string;
  completed: boolean;
  list: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  quantity?: number;
  unit?: string;
}

export interface UpdateProductDto {
  name?: string;
  quantity?: number;
  category?: string;
  unit?: string;
  completed?: boolean;
}
