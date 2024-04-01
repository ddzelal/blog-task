import { API_ENDPOINT_URL } from "../../constants/appConstant";
import { GetMeReposne, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../interfaces/authRequest";
import { api } from "../config/axiosConfig";

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post(API_ENDPOINT_URL.LOGIN, body);
    return data;
};

export const register = async (body: RegisterRequest): Promise<RegisterResponse> => {
    const { data } = await api.post(API_ENDPOINT_URL.REGISTER, body);
    return data;
};


export const getMe = async (): Promise<GetMeReposne> => {
    const { data } = await api.get(API_ENDPOINT_URL.GET_ME);
    return data;
};
