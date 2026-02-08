import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ThemeProvider from './providers/ThemeProvider'
import { routes } from './Routes'

const Toast = lazy(() => import('@/components/ui/Toast'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      retry: 1,
      retryDelay: 1.5 * 1000,
      networkMode: 'always',
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {routes?.map((item, idx) => (
              <Route key={idx} path={item.path} element={item.element} />
            ))}
          </Routes>
          <Toast />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
