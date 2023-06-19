import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3232' }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => '/students',
    }),
    createStudent: builder.mutation({
      query: (student) => ({
        url: '/students',
        method: 'POST',
        body: student,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useDeleteStudentMutation,
} = apiSlice;
