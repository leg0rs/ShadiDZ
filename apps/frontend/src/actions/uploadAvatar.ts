'use server';

import { prisma } from '@packages/databases';
import { randomBytes } from 'crypto';
import { existsSync } from 'fs';
import { unlink, writeFile } from 'fs/promises';
import path from 'path';

import GetSession from '@/utils/getsession';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export async function uploadAvatarAction(formData: FormData) {
	try {
		const session = await GetSession();

		if (!session?.user?.id) {
			return { success: false, error: 'Не авторизован' };
		}

		const file = formData.get('avatar') as File;

		if (!file) {
			return { success: false, error: 'Файл не найден' };
		}

		if (!ALLOWED_TYPES.includes(file.type)) {
			return { success: false, error: 'Недопустимый тип файла. Разрешены только изображения.' };
		}

		if (file.size > MAX_FILE_SIZE) {
			return { success: false, error: 'Файл слишком большой. Максимальный размер 5MB.' };
		}

		const currentUser = await prisma.user.findUnique({
			where: { id: session.user.id },
			select: { image: true },
		});

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const fileExtension = file.name.split('.').pop();
		const randomName = randomBytes(16).toString('hex');
		const fileName = `${randomName}.${fileExtension}`;

		const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
		const filePath = path.join(uploadDir, fileName);

		await writeFile(filePath, buffer);

		const imageUrl = `/uploads/avatars/${fileName}`;

		if (currentUser?.image && currentUser.image.startsWith('/uploads/avatars/')) {
			const oldFilePath = path.join(process.cwd(), 'public', currentUser.image);
			if (existsSync(oldFilePath)) {
				try {
					await unlink(oldFilePath);
					console.log('Старая аватарка удалена:', oldFilePath);
				} catch (error) {
					console.error('Ошибка удаления старой аватарки:', error);
				}
			}
		}

		await prisma.user.update({
			where: { id: session.user.id },
			data: { image: imageUrl },
		});

		return { success: true, imageUrl };
	} catch (error) {
		console.error('Ошибка загрузки аватара:', error);
		return { success: false, error: 'Ошибка сервера при загрузке файла' };
	}
}
