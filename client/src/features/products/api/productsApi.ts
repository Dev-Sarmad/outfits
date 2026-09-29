import { GetProductResponse, GetProductsResponse } from "../Types/product";

import { baseApi } from "@/api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => "/product",
      providesTags: ["Products"],
    }),
    getProduct: builder.query<GetProductResponse, string>({
      query: (id: string) => `/product/:${id}`,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
