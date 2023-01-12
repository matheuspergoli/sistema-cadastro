import React from 'react'
import Head from 'next/head'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import Router from 'next/router'
import { getUser } from '../services'
import { GetServerSideProps } from 'next'
import { AuthContext } from '../context/AuthContext'
import { QueryClient, useQuery, dehydrate } from 'react-query'

interface UserData {
	user: {
		id: string
		name: string
		email: string
	}
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const cookies = nookies.get(context)
	const queryClient = new QueryClient()

	if (!cookies['user-token']) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const { 'user-token': token } = cookies

	try {
		const verifyToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as UserData
		await queryClient.prefetchQuery(['user', verifyToken.user.id], () => getUser(verifyToken.user.id))
		return {
			props: {
				id: verifyToken.user.id,
				dehydratedState: dehydrate(queryClient)
			}
		}
	} catch (error) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}
}

function Dashboard(props: { id: string }) {
	const { signOut } = React.useContext(AuthContext)
	const { data: user } = useQuery({ queryKey: ['user', props.id], queryFn: () => getUser(props.id) })

	return (
		<>
			<Head>
				<title>NextJS App</title>
			</Head>
			<main className='container mx-auto'>
				<h1 className='mb-5 text-2xl font-bold'>Dashboard</h1>
				<p className='mb-5'>Bem vindo, {user?.name}</p>
				<p className='mb-5'>Seu email: {user?.email}</p>
				<button
					className='rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700'
					onClick={() => {
						signOut()
						Router.push('/')
					}}>
					Logout
				</button>
			</main>
		</>
	)
}

export default Dashboard
