import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';

export const baseUrl = process.env.BASE_URL;

export const masterUrl = process.env.MASTER_URL;
export const odataV2 = process.env.ODATA_V2;
const authUrls = [
  'authToken',
  // 'createFireBasetokenAndStore',
  // 'createLocationAndStore',
];
const customBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, {endpoint}) => {
    const token = await AsyncStorage.getItem('tokenInfo');
    // console.log('token: ', token);
    if (authUrls.indexOf(endpoint) < 0) {
      headers.set('Authorization', `bearer ${token}`);
      headers.set('Content-Type', 'application/json');
    }
    headers.set('Accept', 'application/json');
    return headers;
  },
});

export const baseQuery = async (args, api, extraOptions = {}) => {
  try {
    const response = await customBaseQuery(args, api, extraOptions);
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const error = prepareErrorResponse(response, refreshToken);
    return {
      data: response?.data?.d ?? response.data ?? response.meta.response.ok,
      error: error,
    };
  } catch (error) {
    console.error('error', error);
  }
};
/**
 * This function is used for AutoLogin as well as Refresh Token generation
 * @param {*} email
 * @param {*} password
 * @param {*} refreshToken
 */
const tokenGeneration = async (email, password, refreshToken) => {
  const clientId = process.env.CLIENT_ID;
  const clientPass = process.env.CLIENT_PASS;
  const credentials = `${clientId}:${clientPass}`;
  const base64Credentials = base64.encode(credentials);

  let formValue = {};
  if (refreshToken) {
    formValue = {
      // username: email?.toString(),
      // password: password?.toString(),
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
  }
  if (email && password) {
    formValue = {
      username: email?.toString(),
      password: password?.toString(),
      grant_type: 'password',
    };
  }
  /**
   * below code is to convert form data into URL encoded
   */
  const formBody = Object.keys(formValue)
    .map(
      key => encodeURIComponent(key) + '=' + encodeURIComponent(formValue[key]),
    )
    .join('&');
  try {
    const tokenReponse = await fetch(`${baseUrl}oauth/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
      },
      body: formBody,
    });
    const jsonResponse = await tokenReponse.json();

    if (tokenReponse?.ok) {
      AsyncStorage.setItem('tokenInfo', jsonResponse?.access_token);
      AsyncStorage.setItem('refreshToken', jsonResponse.refresh_token);
    } else if (refreshToken) {
      autoLoginHandler();
    } else {
      console.log(
        'Your session is no longer valid. Please log out and sign in again.',
      );
    }
  } catch (error) {
    console.error('Error in token generate:', error);
  }
};

/**
 *NOTE - This same Code also write in baseQuery.js so if you need to change anything then also do changes in baseQuery.js
 */
const autoLoginHandler = async () => {
  const loginUserEmailBase64 = await AsyncStorage.getItem('loginUserEmail');
  const loginUserPasswordBase64 = await AsyncStorage.getItem(
    'loginUserPassword',
  );

  if (loginUserEmailBase64 && loginUserPasswordBase64) {
    const loginUserEmail = base64.decode(loginUserEmailBase64);
    const loginUserPassword = base64.decode(loginUserPasswordBase64);
    try {
      await tokenGeneration(loginUserEmail, loginUserPassword, '');
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  } else {
    console.log(
      'Your session is no longer valid. Please log out and sign in again.',
    );
  }
};

const extractEndpoint = url => {
  try {
    return url.split('/api/odata/v2/')[1]?.split('?')[0];
  } catch (error) {
    console.error('Invalid URL:', error.message);
    return null;
  }
};

const checkEndpointInUrl = (url, endpointsArray) => {
  if (url) {
    const endpoint = extractEndpoint(url);
    return endpoint && endpointsArray.includes(endpoint);
  } else {
    return false;
  }
};
const extractErrorMessage = (response, isOriginalErrorMsg) => {
  const errorMessage = response?.error?.data?.error?.message?.value;
  return isOriginalErrorMsg
    ? errorMessage
    : 'Something went wrong. Please try again.';
};

const prepareErrorResponse = (response, refreshToken) => {
  const endPointsForErrorMsg = ['ReceiptValidate'];
  const url = response?.meta?.request?.url;
  const status = response?.meta?.response?.status;
  const isOriginalErrorMsg = checkEndpointInUrl(url, endPointsForErrorMsg);
  const headers = response?.meta?.response?.headers?.map;

  if (response?.meta?.response?.ok || [200, 201].includes(status)) {
    return null;
  }

  switch (status) {
    case 417:
    case 500:
      try {
        const oMsg = JSON.parse(headers?.['sap-message']);
        return oMsg?.code === 'validation' || oMsg?.code === 'exception'
          ? oMsg?.message
          : extractErrorMessage(response, isOriginalErrorMsg);
      } catch {
        return extractErrorMessage(response, isOriginalErrorMsg);
      }

    case 401:
      if (refreshToken) {
        tokenGeneration('', '', refreshToken);
      }
      return status;

    default:
      return extractErrorMessage(response, isOriginalErrorMsg);
  }
};

export const metaDataCustomBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: headers => {
    headers.set('Accept', 'application/xml');
    return headers;
  },
});

export const metadataBaseQuery = async (args, api, extraOptions = {}) => {
  try {
    const response = await metaDataCustomBaseQuery(args, api, extraOptions);
    return {data: response?.data?.d ?? response.data};
  } catch (error) {
    console.error('Metadata request failed:', error.message);
    return {error: 'Metadata request failed'};
  }
};
