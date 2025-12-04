import '@/styles/globals.css';
import GetSession from '@/utils/getsession';
import { redirect } from 'next/navigation';
// const geistSans = Geist({
// 	variable: '--font-geist-sans',
// 	subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
// 	variable: '--font-geist-mono',
// 	subsets: ['latin'],
// });

// ${geistSans.variable} ${geistMono.variable}
export default async function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await GetSession();
	if (!session) {
		redirect('/login');
	}
	return <div>{children};</div>;
}
