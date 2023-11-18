import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api_url } from '@/utils';
import type { RootState } from '@/app/store';
import { ResponseType, SavedQuery } from '@/types';

/**
 * An API slice that provides methods for interacting with the saved-queries endpoint.
 * Containt the reducerPath, baseQuery, and endpoints.
 * reducerPath: The name of the reducer that will be added to the store.
 * baseQuery: The default fetch function that will be used for all endpoints.
 * endpoints: An object containing the endpoints for the API.
 * getSavedQueries: A query that gets all saved queries.    
 * getSavedQueryById: A query that gets a saved query by id.
 */
const savedQueryApi = createApi({
    reducerPath: 'savedQueryApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${api_url}saved-queries`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSavedQueries: builder.query<ResponseType<SavedQuery[]>, null >({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
        getSavedQueryById: builder.query({
            query: (id) => ({
                url: `/${id}/`,
                method: 'GET',
            }),
        }),
        saveQuery: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
        }),
        deleteSavedQuery: builder.mutation({
            query: (id) => ({
                url: `/${id}/`,
                method: 'DELETE',
            }),
        }),
    }),
});

export default savedQueryApi;
export const { 
    useGetSavedQueriesQuery, 
    useGetSavedQueryByIdQuery,
    useSaveQueryMutation,
    useDeleteSavedQueryMutation,
} = savedQueryApi;