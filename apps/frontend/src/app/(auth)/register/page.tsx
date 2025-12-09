'use client';

import { authClient } from '@legors/auth/client';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
		});
	};

	const handleSignUp = async () => {
		setError(null);
		setIsLoading(true);

		const { error } = await authClient.signUp.email({
			email,
			password,
			name,
		});

		if (error) {
			setError(error.message || 'Ошибка регистрации');
			setIsLoading(false);
		} else {
			// Обычно после регистрации сессия создается автоматически.
			// Если твой конфиг требует подтверждения почты, перенаправь на страницу "Проверь почту"
			router.push('/');
			router.refresh();
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background px-4">
			<div className="w-full max-w-md bg-card rounded-xl shadow-lg p-8 border border-border">
				<div className="text-center mb-8">
					<h1 className="text-2xl font-bold text-foreground">Регистрация</h1>
					<p className="text-muted-foreground text-sm mt-2">Создайте новый аккаунт</p>
				</div>

				<button
					onClick={handleGoogleSignIn}
					disabled={isLoading}
					className="w-full flex items-center justify-center gap-3 border border-border p-2.5 rounded-lg hover:bg-accent transition font-medium text-foreground disabled:opacity-50"
				>
					{/* SVG Google (тот же самый) */}
					<svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					Google
				</button>

				<div className="flex items-center my-6">
					<div className="flex-grow border-t border-border"></div>
					<span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase">
						или email
					</span>
					<div className="flex-grow border-t border-border"></div>
				</div>

				<div className="flex flex-col gap-4">
					{error && (
						<div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20 text-center">
							{error}
						</div>
					)}

					<input
						placeholder="Ваше имя"
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={isLoading}
						className="w-full border border-input p-3 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition bg-background text-foreground"
					/>
					<input
						placeholder="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={isLoading}
						className="w-full border border-input p-3 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition bg-background text-foreground"
					/>
					<div className="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder="Пароль"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={isLoading}
							className="w-full border border-input p-3 pr-10 rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition bg-background text-foreground"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							disabled={isLoading}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
						>
							{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
						</button>
					</div>

					<button
						onClick={handleSignUp}
						disabled={isLoading}
						className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:opacity-90 transition font-medium disabled:opacity-70 flex justify-center"
					>
						{isLoading ? 'Создание...' : 'Зарегистрироваться'}
					</button>
				</div>

				<div className="mt-6 text-center text-sm text-muted-foreground">
					Уже есть аккаунт?{' '}
					<Link href="/login" className="text-primary font-semibold hover:underline">
						Войти
					</Link>
				</div>
			</div>
		</div>
	);
}
