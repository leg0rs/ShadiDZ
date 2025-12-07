import { Button } from '@shadcn/button';
import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
const NotFound = () => {
	return (
		<div className="relative h-svh bg-background overflow-hidden text-foreground text-[18px]">
			<div className="absolute top-[50%] md:top-[20%] left-1/2 text-[230px] sm:text-[350px] md:text-[750px] font-black animate-errorAnim error-404-position">
				404
			</div>
			<div className="absolute bottom-0 left-0 right-0 w-full mx-auto animate-catAnim">
				<div className="relative w-full h-[60vh] sm:h-[65vh] md:aspect-video md:h-auto">
					<Image
						className="object-cover"
						src="/404.png"
						alt="cat"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1920px) 100vw, 1920px"
					/>
				</div>

				<div className="flex flex-col items-center gap-4 text-white absolute bottom-24 sm:bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 font-black text-5xl sm:text-7xl md:text-9xl">
					<h1>OKAK</h1>
					<Link href="/">
						<Button
							variant="default"
							size="lg"
							className="gap-2 text-base font-semibold bg-white text-black hover:bg-gray-200"
						>
							<ArrowLeftIcon className="w-5 h-5" />
							Вернуться на главную
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
