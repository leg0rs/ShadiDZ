import { auth } from '@legors/auth';
import { toNextJsHandler } from 'better-auth/next-js';

export const { GET, POST } = toNextJsHandler(auth);

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb',
		},
	},
};
