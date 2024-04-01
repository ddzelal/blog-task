import { Box } from "@mui/material";
import Header from "./Header";
import Router from "../routes";
import { useGetUserInfoQuery } from "../services/queries/authService";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

function ApplicationLayout() {
    const { data, isSuccess, isFetched } = useGetUserInfoQuery();

    const { setUser } = useAuthStore((state) => state);

    useEffect(() => {
        if (isSuccess) {
            setUser(data);
        }
    }, [isFetched]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header />
            <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
                <Router />
            </Box>
        </Box>
    );
}

export default ApplicationLayout;
