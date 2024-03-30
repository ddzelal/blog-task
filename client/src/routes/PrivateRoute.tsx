import { type ReactElement } from "react";
import { Navigate } from "react-router";
// import useAuthStore from '@/store/useAuthStore';

interface Props {
    children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    // Replace with your auth condition
    // const { isAuthenticated } = useAuthStore((state) => state);

    const isAuthenticated = false;
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
