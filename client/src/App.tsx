import { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplicationLayout from "./components/ApplicationLayout";

function App() {
    const queryClient = new QueryClient();

    return (
        <Fragment>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <ApplicationLayout />
                    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
                </BrowserRouter>
            </QueryClientProvider>
        </Fragment>
    );
}

export default App;
