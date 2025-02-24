import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import socket from "./socket";

const API_HOST = import.meta.env.VITE_API_HOST;

export const allTags = ["List", "Products"];

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_HOST}/api/v1`,
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: allTags,
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server");

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
  });
});
