import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/auth/me/${id}`,
    }),
    postCourse: builder.mutation({
      query: (credentials) => ({
        url: '/course/create-course',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCourseUserById: builder.query({
      query: (userId) => `/course/get-course/${userId}`,
    }),
  }),
});

export const { 
  useGetUserByIdQuery,
  usePostCourseMutation,
  useGetCourseUserByIdQuery
} = courseApi;
