import { ListResponse } from "../types";
import { api } from "./api";

export const listApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getList: builder.query<ListResponse, string>({
      query: (id) => `lists/${id}`,
    }),
    getAllLists: builder.query<ListResponse[], void>({
      query: () => "lists",
      providesTags: ["List"],
    }),
    createList: builder.mutation<ListResponse, Partial<ListResponse>>({
      query: (body) => ({
        url: "lists",
        method: "POST",
        body,
      }),
      invalidatesTags: ["List"],
    }),
    editList: builder.mutation<
      ListResponse,
      { id: string; body: Partial<ListResponse> }
    >({
      query: ({ id, body }) => ({
        url: `lists/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    addOwner: builder.mutation<ListResponse, { id: string; ownerId: string }>({
      query: ({ id, ownerId }) => ({
        url: `lists/${id}/owner`,
        method: "PUT",
        body: { ownerId },
      }),
    }),
    removeOwner: builder.mutation<
      ListResponse,
      { id: string; ownerId: string }
    >({
      query: ({ id, ownerId }) => ({
        url: `lists/${id}/owner`,
        method: "DELETE",
        body: { ownerId },
      }),
    }),
    removeList: builder.mutation<void, string>({
      query: (id) => ({
        url: `lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["List"],
    }),
  }),
});

export const {
  useGetListQuery,
  useLazyGetListQuery,
  useGetAllListsQuery,
  useCreateListMutation,
  useEditListMutation,
  useAddOwnerMutation,
  useRemoveOwnerMutation,
  useRemoveListMutation,
} = listApi;
