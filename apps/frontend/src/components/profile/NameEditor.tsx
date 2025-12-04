'use client';

import { updateUserNameAction } from '@/actions/updateUserName';
import { Button } from '@shadcn/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NameEditor({ currentName }: { currentName: string }) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(currentName);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSave = async () => {
		setIsLoading(true);
		setError(null);

		const formData = new FormData();
		formData.append('name', name);

		const result = await updateUserNameAction(formData);

		if (result.success) {
			setIsEditing(false);
			router.refresh();
		} else {
			setError(result.error || 'Ошибка обновления имени');
		}

		setIsLoading(false);
	};

	const handleCancel = () => {
		setName(currentName);
		setError(null);
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<div className="p-6 bg-secondary/50 rounded-xl border border-border/50 shadow-custom-sm transition-all hover:shadow-custom-md hover:border-border">
				<p className="text-sm text-muted-foreground mb-2">Имя</p>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full px-4 py-2 mb-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					placeholder="Введите имя"
					disabled={isLoading}
				/>
				{error && <p className="text-sm text-red-500 mb-3">{error}</p>}
				<div className="flex gap-2">
					<Button onClick={handleSave} disabled={isLoading} className="flex-1">
						{isLoading ? 'Сохранение...' : 'Сохранить'}
					</Button>
					<Button onClick={handleCancel} variant="outline" disabled={isLoading} className="flex-1">
						Отмена
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 bg-secondary/50 rounded-xl border border-border/50 shadow-custom-sm transition-all hover:shadow-custom-md hover:border-border">
			<p className="text-sm text-muted-foreground mb-2">Имя</p>
			<div className="flex justify-between items-center">
				<p className="font-semibold text-lg">{currentName}</p>
				<Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
					Изменить
				</Button>
			</div>
		</div>
	);
}
