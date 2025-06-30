export const req = (path: string, options?: RequestInit) =>
	new Request(`http://localhost:3000${path}`, options)

export const post = (path: string, body: Record<string, any>) =>
	new Request(`http://localhost${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

export const delay = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay))