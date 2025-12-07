// BaseAvatar.tsx (без "use client")
import { Avatar, AvatarFallback, AvatarImage } from '@shadcn/avatar';
import { User } from 'lucide-react';

type BaseAvatarProps = {
	src?: string | null;
	size?: number;
	className?: string;
};

export default function BaseAvatar({ src, className = '' }: BaseAvatarProps) {
	return (
		<Avatar className={className + ' cursor-pointer'}>
			<AvatarImage src={src ?? undefined} />
			<AvatarFallback className="bg-transparent">
				<User className="h-40 w-40 text-black dark:text-white" />
			</AvatarFallback>
		</Avatar>
	);
}
