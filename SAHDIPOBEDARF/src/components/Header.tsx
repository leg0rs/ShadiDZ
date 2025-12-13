import { useEffect, useState } from 'react';

const Header = () => {
	const [text, setText] = useState('шаховпобеда.рф');
	const [phase, setPhase] = useState<'idle' | 'deleting' | 'typing' | 'finished'>('idle');
	const [showImage, setShowImage] = useState(false);

	useEffect(() => {
		if (phase === 'idle') {
			const timeout = setTimeout(() => setPhase('deleting'), 1200);
			return () => clearTimeout(timeout);
		}

		if (phase === 'deleting') {
			if (text.length > 0) {
				const timeout = setTimeout(() => {
					setText((prev) => prev.slice(0, -1));
				}, 50);
				return () => clearTimeout(timeout);
			} else {
				setPhase('typing');
			}
		}

		if (phase === 'typing') {
			const targetText = 'ШАДИПОБЕДА.РФ';

			if (text.length === 8) {
				setShowImage(true);
			}

			if (text.length < targetText.length) {
				const timeout = setTimeout(() => {
					setText(targetText.slice(0, text.length + 1));
				}, 100);
				return () => clearTimeout(timeout);
			} else {
				setPhase('finished');
			}
		}
	}, [text, phase]);

	return (
		<header className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-900 text-center snap-start">
			<div className="z-10 mb-20">
				<h1 className="font-mono text-5xl font-bold text-white sm:text-7xl md:text-8xl lg:text-9xl">
					{text}
					<span className="animate-pulse text-red-500">|</span>
				</h1>
			</div>
			<div
				className={`absolute bottom-0 left-0 w-full transform transition-transform duration-1000 ease-out ${
					showImage ? 'translate-y-0' : 'translate-y-full'
				}`}
			>
				<img
					src="../../public/ShadiLogo.png"
					alt="Shadi"
					className="mx-auto h-[130vh] w-auto object-contain object-bottom drop-shadow-2xl"
				/>
			</div>
		</header>
	);
};

export default Header;
