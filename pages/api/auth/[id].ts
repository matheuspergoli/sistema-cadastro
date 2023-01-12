import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

async function auth(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req
	const id = req.query.id as string

	switch (method) {
		case 'GET':
			try {
				const user = await prisma.user.findUnique({
					where: {
						id: String(id)
					}
				})
				res.status(200).json({
					id: user?.id,
					name: user?.name,
					email: user?.email
				})
			} catch (error) {
				res.status(400).json({ error })
			}
			break
		default:
			res.setHeader('Allow', ['GET'])
			res.setHeader('Access-Control-Allow-Origin', '*')
			res.setHeader('Access-Control-Allow-Methods', 'GET')
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}

export default auth
