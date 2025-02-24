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
      invalidatesTags: ["Products"],
    }),
    getProductsByListId: builder.query<Product[], string>({
      query: (listId) => `/lists/${listId}/products`,
      providesTags: ["Products"],
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
    getSuggestedProducts: builder.query<Product[], string>({
      query: (query) => `/products/suggestions?query=${query}`,
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsByListIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSuggestedProductsQuery,
} = productApi;
