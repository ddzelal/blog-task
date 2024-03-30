import { Fragment } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header/Header';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
  const queryClient = new QueryClient();
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Router />
          </Box>
        </Box>
        </BrowserRouter>
      </QueryClientProvider>
    </Fragment>
  )
}

export default App
