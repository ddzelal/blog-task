export interface LoginRequest {
    email:string,
    password:string
}

export interface LoginResponse {
    accessToken:string
}

export interface RegisterRequest {
    email:string,
    password:string,
    fullName:string
}

export interface RegisterResponse {
    user: {
      email: string;
      password: string;
      id: string;
      fullName:string
    };
  }
  