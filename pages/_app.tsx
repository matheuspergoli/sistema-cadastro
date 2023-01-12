import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = React.useState(() => new QueryClient())

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</Hydrate>
			</QueryClientProvider>
		</AuthProvider>
	)
}
