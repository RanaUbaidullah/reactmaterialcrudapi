import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://localhost:3232'}),
    endpoints: (builder) =>({
        getStudents: builder.query({
            query: () => '/students',
        })
    })
})

export const {
    useGetStudentsQuery
} = apiSlice