import UserIcon from '@/components/profile/avatarUserbutton';
import GetSession from '@/utils/getsession';
import getUserIcon from '@/utils/getUserIcon';

export default async function Profile() {
	const session = await GetSession();
	const icon = session ? await getUserIcon() : null;
	return (
		<div className="min-h-screen bg-background p-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">Панель управления</h1>
				</div>

				<div className="bg-background rounded-xl shadow-sm border border-border p-6 flex items-center max-sm:flex-wrap">
					<UserIcon src={icon} />
					<div className="w-full gap-4 flex flex-col flex-wrap pl-20">
						<h2 className="text-xl font-semibold mb-4 ">Мой профиль</h2>
						<div className="p-4 bg-secondary rounded-lg">
							<p className="text-sm text-gray-500">Имя</p>
							<p className="font-medium">{session?.user?.name}</p>
						</div>
						<div className="p-4 bg-secondary rounded-lg">
							<p className="text-sm text-gray-500">Email</p>
							<p className="font-medium">{session?.user?.email}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
