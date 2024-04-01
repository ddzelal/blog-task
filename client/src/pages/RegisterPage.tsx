import { Box, Button, TextField, Typography, Container, Paper, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/authValidation";
import { useRegisterMutation } from "../services/queries/authService";
import { RegisterRequest } from "../interfaces/authRequest";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const navigate = useNavigate();

    const { mutateAsync } = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterRequest>({ resolver: yupResolver(registerSchema) });

    const handleRegister = async (data: RegisterRequest) => {
        await mutateAsync(data, {
            onSuccess: () => {
                navigate("/login");
                toast("successful registration");
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
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit(handleRegister)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        autoComplete="name"
                        {...register("fullName")}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Box display="flex" justifyContent="center">
                        <Link component={RouterLink} to="/login" variant="body2">
                            Already have an account? Sign In
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;
