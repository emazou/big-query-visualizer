import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
    DataLogin, 
    ResponseType, 
    User, 
    UserLogin, 
    UserRegister 
} from '@/types';
import { api_url } from '@/utils';


/**
 * An API slice that provides methods for interacting with the user endpoint.
 * Containt the reducerPath, baseQuery, and endpoints.
 * reducerPath: The name of the reducer that will be added to the store.
 * baseQuery: The default fetch function that will be used for all endpoints.
 * endpoints: An object containing the endpoints for the API.
 */
const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${api_url}users` }),
    endpoints: (builder) => ({
        getUserById: builder.query<ResponseType<User>, number>({
            query: (id) => ({
                url: `/${id}/`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                }
            }),

        }),
        login: builder.mutation<ResponseType<DataLogin>, UserLogin>({
            query: (body) => ({
                url: '/login/',
                method: 'POST',
                body,
            }),
        }),
        register: builder.mutation<ResponseType<null>, UserRegister>({
            query: (body) => ({
                url: '/register/',
                method: 'POST',
                body,
            }),
        }),
        validateToken: builder.mutation<ResponseType<null>, string>({
            query: (token) => ({
                url: '/validate-token/',
                method: 'POST',
                body: { token },
            }),
        }),
    }),
});

export default userApi;
export const { 
    useGetUserByIdQuery,
    useLoginMutation, 
    useValidateTokenMutation,
    useRegisterMutation,
} = userApi;