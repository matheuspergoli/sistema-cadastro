interface GetUserResponse {
	id: string
	name: string
	email: string
}

export const getUser = async (id: string): Promise<GetUserResponse> => {
	const response = await fetch(`/api/auth/${id}`)
	const data = await response.json()
	return data
}
