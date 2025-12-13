'use server';

import { prisma } from '@packages/databases';

import GetSession from '@/utils/getsession';
import { logger } from '@/utils/logger';

export async function updateUserNameAction(formData: FormData) {
	try {
		const session = await GetSession();

		if (!session?.user?.id) {
			return { success: false, error: 'Не авторизован' };
		}

		const name = formData.get('name') as string;

		if (!name || name.trim().length === 0) {
			return { success: false, error: 'Имя не может быть пустым' };
		}

		if (name.trim().length > 100) {
			return { success: false, error: 'Имя слишком длинное (максимум 100 символов)' };
		}

		await prisma.user.update({
			where: { id: session.user.id },
			data: { name: name.trim() },
		});

		return { success: true, name: name.trim() };
	} catch (error) {
		logger.error('Ошибка обновления имени:', error);
		return { success: false, error: 'Ошибка сервера при обновлении имени' };
	}
}
