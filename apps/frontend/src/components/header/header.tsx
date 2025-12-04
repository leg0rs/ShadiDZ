import GetSession from '@/utils/getsession';
import getUserIcon from '@/utils/getUserIcon';
import { ModeToggle } from '@shadcn/mode-toggle';
import Image from 'next/image';
import Link from 'next/link';
import AvatarUser from './avatarUserdropdown';
const Header = async () => {
	const session = await GetSession();
	const icon = session ? await getUserIcon() : null;
	return (
		<header className="z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-6">
					<Link href="/" className="flex items-center gap-2">
						<Image width={40} height={40} src="/TealDeer.png" alt="Логотип Команды" />
						<span className="text-xl font-bold text-foreground">TealDeer</span>
					</Link>
				</div>

				<div className="flex items-center gap-4">
					<ModeToggle />
					{session ? <AvatarUser src={icon} /> : <></>}
				</div>
			</div>
		</header>
	);
};

export default Header;
