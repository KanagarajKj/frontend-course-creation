import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      
      // If token exists, add it to the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/api/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: '/api/google-login',
        method: 'POST',
        body: credentials,
      }),
    }),
    githubLogin: builder.mutation({
      query: (credentials) => ({
        url: '/api/github-login',
        method: 'POST',
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: (credentials) => ({
        url: '/api/refresh-token',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: '/api/logout',
        method: 'POST',
        body: credentials,
      }),
    }),
    // Add more endpoints as needed
  }),
});

export const { 
  useSignupMutation, 
  useLoginMutation, 
  useGoogleLoginMutation, 
  useGithubLoginMutation, 
  useRefreshTokenMutation,
  useLogoutMutation
} = authApi;
