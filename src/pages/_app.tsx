import "src/styles/globals.css"
import "src/core/styles/index.css"

import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"

import { AppProps, ErrorBoundary, ErrorComponent, ErrorFallbackProps } from "@blitzjs/next"
import { Toaster } from "@src/core/components/common/Toast"
import ThemeContextProvider from "@src/core/context/ThemeContext"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ThemeContextProvider>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        {getLayout(
          <Suspense fallback="Loading...">
            <Component {...pageProps} />
            <Toaster />
          </Suspense>
        )}
      </ErrorBoundary>
    </ThemeContextProvider>
  )
}

export default withBlitz(MyApp)
