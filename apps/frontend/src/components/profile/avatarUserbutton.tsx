'use client';

import { useAvatarUpload } from '@/hooks/useAvatarUpload';
import BaseAvatar from '../BaseAvatar';
import { AvatarOverlay } from './AvatarOverlay';

export default function UserIcon({ src }: { src?: string | null }) {
	const { fileInputRef, isUploading, currentSrc, handleFileChange, openFilePicker } =
		useAvatarUpload(src);

	return (
		<div className="relative">
			<input
				ref={fileInputRef}
				type="file"
				accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
				onChange={handleFileChange}
				className="hidden"
				disabled={isUploading}
			/>

			<button
				onClick={openFilePicker}
				disabled={isUploading}
				className="relative rounded-full group disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<BaseAvatar src={currentSrc} className="hidden w-40 h-40 m-0 md:block rounded-full" />
				<AvatarOverlay isUploading={isUploading} />
			</button>
		</div>
	);
}
