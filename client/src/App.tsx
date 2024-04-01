import { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const queryClient = new QueryClient();

    return (
        <Fragment>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    {/* TODO CREATE  < LYTT */}
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
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
                </BrowserRouter>
            </QueryClientProvider>
        </Fragment>
    );
}

export default App;
