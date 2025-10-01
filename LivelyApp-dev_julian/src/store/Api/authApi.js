import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery, odataV2} from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    authToken: builder.mutation({
      query: ({body, headers}) => {
        return {
          url: 'oauth/token',
          method: 'POST',
          body: body,
          headers: headers,
        };
      },
    }),

    getTokenDetail: builder.query({
      query: () => {
        return {
          url: 'token/context',
          method: 'GET',
        };
      },
    }),

    registerToken: builder.mutation({
      query: ({body}) => {
        return {
          url: 'pushnotification/registertoken',
          method: 'POST',
          body: body,
        };
      },
    }),

    getLogout: builder.query({
      query: ({authToken}) => {
        return {
          url: `token/revoke/${authToken}`,
          method: 'GET',
        };
      },
    }),

    createChangePassword: builder.mutation({
      query: ({body, headers}) => {
        return {
          url: 'change_password',
          method: 'POST',
          body: body,
          headers: headers,
        };
      },
    }),
    createZuserConsent: builder.mutation({
      query: ({body}) => {
        return {
          url: `${odataV2}ZuserConsents`,
          method: 'POST',
          body: body,
        };
      },
    }),
    updateZuserConsent: builder.mutation({
      query: ({body}) => {
        return {
          url: `${odataV2}ZuserConsents(${body.Id})`,
          method: 'PUT',
          body: body,
        };
      },
    }),
    getZuserConsent: builder.query({
      query: ({UserId, DeviceId}) => {
        return {
          url: `${odataV2}ZuserConsents?$format=json&$filter=UserId eq ${UserId} and DeviceId eq '${DeviceId}'`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useAuthTokenMutation,
  useGetLogoutQuery,
  useLazyGetLogoutQuery,
  useGetTokenDetailQuery,
  useRegisterTokenMutation,
  useLazyGetTokenDetailQuery,
  useCreateChangePasswordMutation,
  useCreateZuserConsentMutation,
  useUpdateZuserConsentMutation,
  useLazyGetZuserConsentQuery,
} = authApi;
