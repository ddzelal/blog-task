import { API_ENDPOINT_URL } from "../../constants/api_endpoint_url";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../interfaces/auth.rquest";
import { api } from "../config/axiosConfig";

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post(API_ENDPOINT_URL.LOGIN, body);
  return data;
};

  export const register = async (body: RegisterRequest): Promise<RegisterResponse> => {
    const { data } = await api.post(API_ENDPOINT_URL.REGISTER, body);
    return data 
  };