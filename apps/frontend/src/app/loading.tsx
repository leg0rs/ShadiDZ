import Image from 'next/image';

const Loading = () => {
	return (
		<div className="flex justify-center items-center h-screen bg-background">
			<div className="flex flex-col items-center gap-6">
				<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg animate-bounce">
					<Image src="/logo.png" alt="Loading" fill className="object-cover" />
				</div>

				<div className="flex items-center gap-2">
					<span className="text-xl font-semibold text-foreground">Загрузка</span>
					<span className="flex gap-1">
						<span className="animate-bounce animation-delay-0">.</span>
						<span className="animate-bounce animation-delay-200">.</span>
						<span className="animate-bounce animation-delay-400">.</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Loading;
