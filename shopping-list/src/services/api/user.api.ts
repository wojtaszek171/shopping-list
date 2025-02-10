import { api } from "./api";
import { SessionResponse, TokenResponse, User } from "../types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, User>({
      query: (user) => ({
        url: "user/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // Handle error response
          console.error("SignUp failed: ", error);
        }
      },
    }),
    signIn: builder.mutation<
      TokenResponse,
      Pick<User, "username" | "password">
    >({
      query: (user) => ({
        url: "user/signin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // Handle error response
          console.error("SignIn failed: ", error);
        }
      },
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "user/signout",
        method: "POST",
      }),
    }),
    checkSession: builder.query<SessionResponse, void>({
      query: () => "user/session",
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useCheckSessionQuery,
  useLazyCheckSessionQuery,
} = userApi;
