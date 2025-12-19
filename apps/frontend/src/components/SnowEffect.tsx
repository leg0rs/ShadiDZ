'use client';

import '@/styles/snow.min.css';

import { toast } from '@legors/ui';
import { useEffect, useState } from 'react';

import Snow from '@/utils/Snow.js';
export default function SnowEffect() {
	const [keyboardEvent, setKeyboardEvent] = useState<string>('');
	const [showSnow, setShowSnow] = useState<boolean>(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const key = event.key.length === 1 ? event.key : event.key[0];
			setKeyboardEvent((prev) => {
				const next = prev.length < 4 ? prev + key : prev.slice(1) + key;
				if (next.toLowerCase() === 'snow' || next.toLowerCase() === 'ытщц') {
					setShowSnow(true);
				}
				return next;
			});
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (showSnow) {
			toast.success('Снег активирован!', {
				duration: 4000,
			});
		}
	}, [showSnow]);

	useEffect(() => {
		if (typeof window === 'undefined' || !showSnow) return;

		const snowInstance = new (Snow as unknown as { new (): { destroy?: () => void } })();

		return () => {
			snowInstance?.destroy?.();
		};
	}, [showSnow]);

	return null;
}
