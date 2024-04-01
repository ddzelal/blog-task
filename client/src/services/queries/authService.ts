import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { getMe, login, register } from "../../api/requests/auth";
import { GetMeReposne, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../interfaces/authRequest";
import { QUERY_KEY } from "../../constants/appConstant";

export const useLoginMutation = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
    return useMutation<LoginResponse, Error, LoginRequest>({ mutationFn: login });
};

export const useRegisterMutation = (): UseMutationResult<RegisterResponse, Error, RegisterRequest> => {
    return useMutation<RegisterResponse, Error, RegisterRequest>({ mutationFn: register });
};


export const useGetUserInfoQuery = (): UseQueryResult<GetMeReposne, Error> => {
    return useQuery<GetMeReposne, Error>({
        queryKey: [QUERY_KEY.USER],
        queryFn: getMe,
        staleTime: Infinity,
    });
};