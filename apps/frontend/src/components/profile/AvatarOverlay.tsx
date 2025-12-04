import clsx from 'clsx';
import { Upload } from 'lucide-react';

type AvatarOverlayProps = {
	isUploading: boolean;
};

export function AvatarOverlay({ isUploading }: AvatarOverlayProps) {
	return (
		<div
			className={clsx(
				'absolute inset-0 rounded-full flex flex-col items-center justify-center',
				'bg-black/50 opacity-0 transition-opacity duration-200',
				'group-hover:opacity-100',
				isUploading && 'opacity-100',
			)}
		>
			{isUploading ? (
				<div className="flex flex-col items-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2"></div>
					<span className="text-white text-xs font-medium">Загрузка...</span>
				</div>
			) : (
				<div className="flex flex-col items-center px-4">
					<Upload className="h-6 w-6 text-white mb-2" />
					<span className="text-white text-xs font-medium text-center">
						Нажмите, чтобы изменить аватарку
					</span>
				</div>
			)}
		</div>
	);
}
