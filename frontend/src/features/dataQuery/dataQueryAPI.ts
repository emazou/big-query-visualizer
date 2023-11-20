import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api_url } from '@/utils';
import type { RootState } from '@/app/store';
import type { 
    ResponseType,
    Country, 
    EducationData, 
    QueryParamsEducationData,
    IndicatorSummary 
} from '@/types';

const dataQueryApi = createApi({
    reducerPath: 'dataQueryApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${api_url}data-query`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: 60*60,
    endpoints: (builder) => ({
        getCountrySummary: builder.query<ResponseType<Country[]>, null >({
            query: () => ({
                url: '/country-summary/',
                method: 'GET',
            }),
        }),
        educationData: builder.mutation<ResponseType<EducationData[]>, QueryParamsEducationData >({
            query: (body) => ({
                url: '/education-data/',
                method: 'POST',
                body,
            }),
        }),
        getIndicatorSumary: builder.query<ResponseType<IndicatorSummary[]>, {
            indicator_name:string; limit: number, indicator_code: string
        } >({
            query: ({indicator_name, limit, indicator_code="_"}) => ({
                // eslint-disable-next-line max-len
                url: `/indicator-summary/?indicator_name=${indicator_name}&limit=${limit}&indicator_code=${indicator_code}`,
                method: 'GET',
            }),
        }),
    }),
});

export default dataQueryApi;
export const { 
    useGetCountrySummaryQuery, 
    useEducationDataMutation,
    useGetIndicatorSumaryQuery,
} = dataQueryApi;