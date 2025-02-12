import { api } from "./api";
import { SessionResponse, TokenResponse, User } from "../types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, User>({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // Handle error response
          console.error("SignUp failed: ", error);
        }
      },
    }),
    signIn: builder.mutation<TokenResponse, Pick<User, "email" | "password">>({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
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
        url: "auth/signout",
        method: "POST",
      }),
    }),
    checkSession: builder.query<SessionResponse, void>({
      query: () => "auth/profile",
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
