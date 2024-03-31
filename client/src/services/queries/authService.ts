import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { login, register } from "../../api/requests/auth";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../interfaces/authRequest";

export const useLoginMutation = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
    return useMutation<LoginResponse, Error, LoginRequest>({ mutationFn: login });
};

export const useRegisterMutation = (): UseMutationResult<RegisterResponse, Error, RegisterRequest> => {
    return useMutation<RegisterResponse, Error, RegisterRequest>({ mutationFn: register });
};
