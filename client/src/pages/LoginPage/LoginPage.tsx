import { Box, Button, TextField, Typography, Container, Paper, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useLoginQuery } from "../../services/queries/auth.service";

const LoginPage = () => {


    const {mutateAsync,data} = useLoginQuery()

    const test = async () => {
        console.log("tu sam");
     await mutateAsync({email:'dzelal_d@live.com',password:'dzelal123'})
     console.log(data);
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                sx={{
                    marginTop: 8,
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button onClick={() => test()}  fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Box display="flex" justifyContent="center">
                        <Link component={RouterLink} to="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
