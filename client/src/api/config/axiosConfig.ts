import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { errorInterceptor, requestInterceptor, successInterceptor } from "../interceptors/interceptors";
import { API_ENDPOINT_URL } from "../../constants/appConstant";

const axiosRequestConfig: AxiosRequestConfig = {
    // TODO ENV >
    baseURL: API_ENDPOINT_URL.API_URL,
    responseType: "json",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
