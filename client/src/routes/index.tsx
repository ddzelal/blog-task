import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ErrorBoundary from "../components/ErrorBoundary";
import BlogPage from "../pages/BlogPage";
import BlogInfo from "../pages/BlogInfo";

const Router = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/blog" replace />} />
        <Route errorElement={<ErrorBoundary />} path="/blog" element={<BlogPage />} />
        <Route errorElement={<ErrorBoundary />} path="/blog/:blogId" element={<BlogInfo />} />
        <Route errorElement={<ErrorBoundary />} path="/login" element={<LoginPage />} />
        <Route errorElement={<ErrorBoundary />} path="/register" element={<RegisterPage />} />
    </Routes>
);

export default Router;
