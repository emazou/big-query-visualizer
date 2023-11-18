import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api_url } from '@/utils';
import type { RootState } from '@/app/store';
import type { ResponseType, Country, EducationData, QueryParamsEducationData, IndicatorSummary } from '@/types';

const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${api_url}comments/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createComment: builder.mutation<ResponseType<null>, {text: string; username: string; saved_query: number} >({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),
        deleteComment: builder.mutation<ResponseType<null>, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
        }),
    }),
    })
})

export const { 
    useCreateCommentMutation,
    useDeleteCommentMutation,
} = commentApi;

export default commentApi;