import { prisma } from '@legors/databases';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),

	// 1. ЯВНО указываем секрет и базовый URL
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL,

	// 2. ВАЖНО для продакшена: разрешенные домены
	// Без этого запросы с https://legors.ru могут блокироваться или теряться
	trustedOrigins: [
		'https://legors.ru',
		'http://localhost:3000', // Для локальной разработки
	],

	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	appName: 'frontend',
	user: {
		additionalFields: {
			language: {
				type: 'string',
				defaultValue: 'ru',
				required: true,
			},
		},
	},
});
