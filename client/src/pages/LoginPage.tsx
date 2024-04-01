import { Box, Button, TextField, Typography, Container, Paper, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useGetUserInfoQuery, useLoginMutation } from "../services/queries/authService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/authValidation";
import { GetMeReposne, LoginRequest } from "../interfaces/authRequest";
import useAuthStore from "../store/useAuthStore";
import { setItem } from "../utils/localStorage";
import { toast } from "react-toastify";
import { LOCAL_STORAGE_KEY, QUERY_KEY } from "../constants/appConstant";
import { useQueryClient } from "@tanstack/react-query";
import { getMe } from "../api/requests/auth";

const LoginPage = () => {
    const queryClient = useQueryClient();

    const { setIsAuthenticated, setUser } = useAuthStore((state) => state);

    const navigate = useNavigate();

    const { mutateAsync } = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const handleLogin = async (data: LoginRequest) => {
        await mutateAsync(data, {
            onSuccess: async (response) => {
                setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, response.accessToken);
                setIsAuthenticated(true);

                const userInfo = await queryClient.fetchQuery<GetMeReposne, Error>({
                    queryKey: [QUERY_KEY.USER],
                    queryFn: getMe,
                    staleTime: Infinity,
                });
                setUser(userInfo);

                queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] });
                navigate("/blog");
                toast.success("successful login");
            },
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                sx={{ marginTop: 8, padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Box display="flex" justifyContent="center">
                        <Link component={RouterLink} to="/register" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
