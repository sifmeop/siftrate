import { NextUIProvider } from '@nextui-org/react'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type AppType } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Layout } from '~/components/layout'
import { ByDateProvider } from '~/providers/ByDateProvider'
import '~/styles/globals.css'
import { AuthGuard } from '~/ui/auth-guard'
import { api } from '~/utils/api'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
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
            </ByDateProvider>
          </AuthGuard>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
