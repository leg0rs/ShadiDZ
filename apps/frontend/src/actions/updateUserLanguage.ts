'use server';

import { prisma } from '@packages/databases';

import GetSession from '@/utils/getsession';

const ALLOWED_LANGUAGES = ['ru', 'en'] as const;

export async function updateUserLanguageAction(formData: FormData) {
	try {
		const session = await GetSession();

		if (!session?.user?.id) {
			return { success: false, error: 'Не авторизован' };
		}

		const language = formData.get('language') as string;

		if (!language || !ALLOWED_LANGUAGES.includes(language as any)) {
			return { success: false, error: 'Неверный язык' };
		}

		await prisma.user.update({
			where: { id: session.user.id },
			data: { language },
		});

		return { success: true, language };
	} catch (error) {
		console.error('Ошибка обновления языка:', error);
		return { success: false, error: 'Ошибка сервера при обновлении языка' };
	}
}
