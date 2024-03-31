import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { login, register } from "../../api/requests/auth.request";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../interfaces/auth.rquest";



export const useLoginMutation = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
  return useMutation<LoginResponse, Error, LoginRequest>({mutationFn: login});
};

export const useRegisterMutation = (): UseMutationResult<RegisterResponse, Error, RegisterRequest> => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({mutationFn: register});
};
