import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type AppType } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Layout } from '~/components/layout'
import { ByDateProvider } from '~/providers/ByDateProvider'
import '~/styles/globals.css'
import { AuthGuard } from '~/ui/auth-guard'
import { QueryLoading } from '~/ui/query-loading/query-loading'
import { api } from '~/utils/api'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <NextThemesProvider attribute='class' defaultTheme='dark'>
            <AuthGuard>
              <ByDateProvider>
                <Layout>
                  <Toaster
                    position='top-center'
                    toastOptions={{
                      duration: 2000,
                      style: {
                        fontFamily: 'inherit',
                        fontSize: '16px'
                      },
                      loading: {
                        duration: 10000
                      }
                    }}
                  />
                  <Component {...pageProps} />
                </Layout>
                <QueryLoading />
              </ByDateProvider>
            </AuthGuard>
          </NextThemesProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
