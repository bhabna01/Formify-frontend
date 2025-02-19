import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './providers/ThemeProvider.jsx'
import "./i18n"; 

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <ThemeProvider>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <div className='max-w-screen-xl mx-auto'>
   
    <RouterProvider router={router} />
    </div>
    </QueryClientProvider>
    </AuthProvider>
    </ThemeProvider>
   
  </StrictMode>,
)
