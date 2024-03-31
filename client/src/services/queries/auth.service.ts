import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { login, register } from "../../api/requests/auth.request";
import { LoginRequest, LoginResponse } from "../../interfaces/auth.rquest";



export const useLoginQuery = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
  return useMutation<LoginResponse, Error, LoginRequest>({mutationFn:login});
};
// export const useRegisterQuery = () =>{
//     return useMutation({mutationFn: async()=> await register(registerBody)});
//   }