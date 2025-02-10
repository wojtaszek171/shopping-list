import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_HOST = import.meta.env.VITE_API_HOST;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_HOST}/v1`,
    credentials: "include",
  }),
  endpoints: () => ({}),
});
