import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getItem } from "../../utils/localStorage";
import { toast } from "react-toastify";
import { LOCAL_STORAGE_KEY } from "../../constants/appConstant";

export interface ConsoleError {
    status: number;
    data: unknown;
}

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getItem<string>(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
    if (error.response?.status === 401) {
        await Promise.reject(error);
    } else {
        if (error.response) {
            const errorMessage: ConsoleError = {
                status: error.response.status,
                data: error.response.data,
            };
            console.error(errorMessage);
            // TODO INTERFACE >
            // @ts-ignore
            toast.error(errorMessage.data.message);
        } else if (error.request) {
            console.error(error.request);
        } else {
            console.error("Error", error.message);
        }
        await Promise.reject(error);
    }
};
