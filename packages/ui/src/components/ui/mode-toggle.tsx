'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	};

	return (
		<button
			onClick={toggleTheme}
			className="cursor-pointer relative hover:bg-accent rounded-md p-2 transition-colors"
			type="button"
		>
			<Moon className="h-10 w-10 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Sun className="absolute top-2 left-2 h-10 w-10 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

			<span className="sr-only">Переключить тему</span>
		</button>
	);
}
