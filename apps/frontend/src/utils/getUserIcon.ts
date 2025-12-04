import { prisma } from '@packages/databases/src';
import GetSession from './getsession';

export default async function getUserIcon() {
	const session = await GetSession();
	let userIcon = null;
	if (session) {
		const User = await prisma.user.findUnique({
			where: { id: session?.session.userId },
		});
		userIcon = User?.image;
	}
	return userIcon;
}
