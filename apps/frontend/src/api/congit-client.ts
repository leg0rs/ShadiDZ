import { createClient } from '@packages/utils/src/api/client/index';

export const myApiClient = createClient({
	baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080',

	fetch: async (url, init) => {
		return fetch(url, {
			...init,
			next: {
				revalidate: 60,
				tags: ['global-api-tag'],
			},
		});
	},
});
