'use server';

import { auth } from '@packages/auth/src';
import { headers } from 'next/headers';

export default async function GetSession() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return session;
}
