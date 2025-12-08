'use client';

import { useRef, useState } from 'react';

import { uploadAvatarAction } from '@/actions/uploadAvatar';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export function useAvatarUpload(initialSrc?: string | null) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [currentSrc, setCurrentSrc] = useState(initialSrc);

	const validateFile = (file: File): string | null => {
		if (!ALLOWED_TYPES.includes(file.type)) {
			return 'Недопустимый тип файла. Разрешены только изображения (JPEG, PNG, WebP, GIF).';
		}

		if (file.size > MAX_FILE_SIZE) {
			return 'Файл слишком большой. Максимальный размер 5MB.';
		}

		return null;
	};

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const validationError = validateFile(file);
		if (validationError) {
			alert(validationError);
			return;
		}

		setIsUploading(true);

		try {
			const formData = new FormData();
			formData.append('avatar', file);

			const result = await uploadAvatarAction(formData);

			if (!result.success) {
				throw new Error(result.error || 'Ошибка загрузки');
			}

			setCurrentSrc(result.imageUrl);
			window.location.reload();
		} catch (error) {
			console.error('Ошибка загрузки аватара:', error);
			alert(error instanceof Error ? error.message : 'Не удалось загрузить аватар');
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	const openFilePicker = () => {
		fileInputRef.current?.click();
	};

	return {
		fileInputRef,
		isUploading,
		currentSrc,
		handleFileChange,
		openFilePicker,
	};
}
