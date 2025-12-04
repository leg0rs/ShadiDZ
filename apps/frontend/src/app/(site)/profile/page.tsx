import UserIcon from '@/components/profile/avatarUserbutton';
import NameEditor from '@/components/profile/NameEditor';
import GetSession from '@/utils/getsession';
import getUserIcon from '@/utils/getUserIcon';

export default async function Profile() {
	const session = await GetSession();
	const icon = session ? await getUserIcon() : null;
	
	return (
		<div className="min-h-screen bg-background p-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						Панель управления
					</h1>
				</div>

				<div className="bg-card rounded-xl shadow-custom-lg border border-border p-8 flex flex-col md:flex-row items-center hover-lift">
					<UserIcon src={icon} />
					<div className="w-full gap-6 flex flex-col flex-wrap md:pl-20 mt-6 md:mt-0">
						<h2 className="text-2xl font-semibold text-center md:text-left">Мой профиль</h2>
						<NameEditor currentName={session?.user?.name || ''} />
						<div className="p-6 bg-secondary/50 rounded-xl border border-border/50 shadow-custom-sm transition-all hover:shadow-custom-md hover:border-border">
							<p className="text-sm text-muted-foreground mb-2">Email</p>
							<p className="font-semibold text-lg">{session?.user?.email}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
