import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { Link } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";

const Router = () => (
    <Routes>
        <Route
            errorElement={<ErrorBoundary />}
            path="/"
            element={
                <PublicRoute>
                    <Link to={"/login"}>
                        <h1>Home GO TO LOGIN</h1>
                    </Link>
                </PublicRoute>
            }
        />
        <Route
            errorElement={<ErrorBoundary />}
            path="/blog"
            element={
                <PrivateRoute>
                    <h2>Blog</h2>
                </PrivateRoute>
            }
        />
        <Route
            errorElement={<ErrorBoundary />}
            path="/login"
            element={
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            }
        />
        <Route
            errorElement={<ErrorBoundary />}
            path="/register"
            element={
                <PublicRoute>
                    <RegisterPage />
                </PublicRoute>
            }
        />
    </Routes>
);

export default Router;
