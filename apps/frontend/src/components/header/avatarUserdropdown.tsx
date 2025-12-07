'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@shadcn/alert-dialog';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@shadcn/dropdown-menu';

import { authClient } from '@legors/auth/client';
import { useRouter } from 'next/navigation';
import BaseAvatar from '../BaseAvatar';

export default function AvatarUser({ src }: { src?: string | null }) {
	const router = useRouter();

	const handleSignOut = async () => {
		await authClient.signOut();
		router.push('/login');
		router.refresh();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="rounded-full">
					<BaseAvatar src={src} />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuItem
					onSelect={() => {
						router.push('/profile');
						router.refresh();
					}}
				>
					Профиль
				</DropdownMenuItem>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Выйти</DropdownMenuItem>
					</AlertDialogTrigger>

					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Вы уверены, что хотите выйти?</AlertDialogTitle>
							<AlertDialogDescription>
								Вы сможете войти снова в любой момент.
							</AlertDialogDescription>
						</AlertDialogHeader>

						<AlertDialogFooter>
							<AlertDialogCancel>Отмена</AlertDialogCancel>
							<AlertDialogAction onClick={handleSignOut} className="hover:bg-red-500">
								Выйти
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
