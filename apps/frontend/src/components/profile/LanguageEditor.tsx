'use client';

import { Button } from '@shadcn/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@shadcn/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { updateUserLanguageAction } from '@/actions/updateUserLanguage';

const LANGUAGES = [
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
] as const;

export default function LanguageEditor({ currentLanguage }: { currentLanguage: string }) {
	const [isEditing, setIsEditing] = useState(false);
	const [language, setLanguage] = useState(currentLanguage);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const currentLang = LANGUAGES.find((lang) => lang.code === language) || LANGUAGES[0];

	const handleSave = async () => {
		setIsLoading(true);
		setError(null);

		const formData = new FormData();
		formData.append('language', language);

		const result = await updateUserLanguageAction(formData);

		if (result.success) {
			setIsEditing(false);
			router.refresh();
		} else {
			setError(result.error || 'Ошибка обновления языка');
		}

		setIsLoading(false);
	};

	const handleCancel = () => {
		setLanguage(currentLanguage);
		setError(null);
		setIsEditing(false);
	};

	if (isEditing) {
		return (
			<div className="p-6 bg-secondary/50 rounded-xl border border-border/50 shadow-custom-sm transition-all hover:shadow-custom-md hover:border-border">
				<p className="text-sm text-muted-foreground mb-2">Язык названия стран</p>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							className="w-full px-4 py-2 mb-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between"
							disabled={isLoading}
						>
							<span className="flex items-center gap-2">
								<span className="text-xl">{currentLang.flag}</span>
								<span>{currentLang.name}</span>
							</span>
							<ChevronDown className="h-4 w-4 opacity-50" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-full min-w-[250px] max-h-[300px] overflow-y-auto">
						{LANGUAGES.map((lang) => (
							<DropdownMenuItem
								key={lang.code}
								onClick={() => setLanguage(lang.code)}
								className="flex items-center justify-between cursor-pointer"
							>
								<span className="flex items-center gap-2">
									<span className="text-xl">{lang.flag}</span>
									<span>{lang.name}</span>
								</span>
								{language === lang.code && <Check className="h-4 w-4" />}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
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
			<p className="text-sm text-muted-foreground mb-2">Язык названия стран</p>
			<div className="flex justify-between items-center">
				<p className="font-semibold text-lg flex items-center gap-2">
					<span className="text-xl">{currentLang.flag}</span>
					<span>{currentLang.name}</span>
				</p>
				<Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
					Изменить
				</Button>
			</div>
		</div>
	);
}
