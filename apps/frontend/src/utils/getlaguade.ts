'use server';

import { prisma } from '@packages/databases';

import GetSession from './getsession';

export default async function getLanguage() {
	const session = await GetSession();
	const user = await prisma.user.findUnique({
		where: { id: session?.session.userId },
	});
	return user?.language as 'ru' | 'en';
}
