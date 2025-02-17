import { api } from "./api";
import { CreateProductDto, UpdateProductDto, Product } from "../types";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<
      void,
      { listId: string; data: CreateProductDto }
    >({
      query: ({ listId, data }) => ({
        url: `/lists/${listId}/products`,
        method: "POST",
        body: data,
      }),
    }),
    getProductsByListId: builder.query<Product[], string>({
      query: (listId) => `/lists/${listId}/products`,
    }),
    updateProduct: builder.mutation<
      void,
      { listId: string; id: string; data: UpdateProductDto }
    >({
      query: ({ listId, id, data }) => ({
        url: `/lists/${listId}/products/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<void, { listId: string; id: string }>({
      query: ({ listId, id }) => ({
        url: `/lists/${listId}/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsByListIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
