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
      invalidatesTags: ["List"],
    }),
    inviteToList: builder.mutation<ListResponse, { id: string; email: string }>(
      {
        query: ({ id, email }) => ({
          url: `lists/${id}/invite`,
          method: "POST",
          body: { email },
        }),
      },
    ),
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
  useInviteToListMutation,
  useRemoveListMutation,
} = listApi;
