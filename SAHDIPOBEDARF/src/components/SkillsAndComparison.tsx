import { useEffect, useState } from 'react';

const SkillsAndComparison = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
					}
				});
			},
			{ threshold: 0.1 },
		);

		const element = document.getElementById('skills-section');
		if (element) observer.observe(element);

		return () => {
			if (element) observer.unobserve(element);
		};
	}, []);

	const skills = [
		{
			title: 'Frontend',
			desc: 'Создание магии на экране. React, TypeScript, Tailwind — твои кисти и краски.',
			icon: '🎨',
			color: 'from-blue-500 to-cyan-400',
		},
		{
			title: 'Backend',
			desc: 'Сердце и мозг приложений. Node.js, Базы данных, Архитектура — ты станешь демиургом.',
			icon: '⚙️',
			color: 'from-green-500 to-emerald-400',
		},
		{
			title: 'DevOps',
			desc: 'Укрощение хаоса. Docker, CI/CD, Deploy — твой код будет жить вечно.',
			icon: '🚀',
			color: 'from-orange-500 to-red-400',
		},
	];

	return (
		<div
			id="skills-section"
			className="flex min-h-screen w-full flex-col items-center justify-center gap-16 bg-gray-900 px-4 py-20 text-white"
		>
			{/* Skills Section */}
			<div className="w-full max-w-6xl">
				<h2 className="mb-12 text-center text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-blue-500">
					Арсенал Знаний
				</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{skills.map((skill, index) => (
						<div
							key={index}
							className={`transform rounded-2xl border border-gray-700 bg-gray-800/50 p-8 text-center shadow-2xl backdrop-blur-sm transition-all duration-700 hover:-translate-y-2 hover:border-gray-500 ${
								isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
							}`}
							style={{ transitionDelay: `${index * 200}ms` }}
						>
							<div className="mb-6 flex justify-center">
								<div
									className={`flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br ${skill.color} text-4xl shadow-lg`}
								>
									{skill.icon}
								</div>
							</div>
							<h3 className="mb-4 text-2xl font-bold text-white">{skill.title}</h3>
							<p className="text-gray-300">{skill.desc}</p>
						</div>
					))}
				</div>
			</div>

			{/* Comparison Section */}
			<div className="w-full max-w-4xl">
				<h2 className="mb-12 text-center text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
					Шади vs Искусственный Интеллект
				</h2>
				<div
					className={`overflow-hidden rounded-2xl border border-gray-700 bg-gray-800/50 shadow-2xl backdrop-blur-sm transition-all duration-1000 ${
						isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
					}`}
					style={{ transitionDelay: '600ms' }}
				>
					<div className="grid grid-cols-3 border-b border-gray-700 bg-gray-900/50 p-4 text-center font-bold text-gray-400">
						<div>Характеристика</div>
						<div className="text-red-500">ChatGPT / AI</div>
						<div className="text-green-500">Шади</div>
					</div>
					<div className="divide-y divide-gray-700">
						<div className="grid grid-cols-3 p-4 text-center transition-colors hover:bg-gray-700/30">
							<div className="font-medium text-gray-300">Написание кода</div>
							<div className="text-gray-400">Копипастит со StackOverflow</div>
							<div className="text-green-400 font-bold">Пишет шедевры с закрытыми глазами</div>
						</div>
						<div className="grid grid-cols-3 p-4 text-center transition-colors hover:bg-gray-700/30">
							<div className="font-medium text-gray-300">Объяснение материала</div>
							<div className="text-gray-400">Сухие факты, ноль души</div>
							<div className="text-green-400 font-bold">Харизма, мемы, жизненные примеры</div>
						</div>
						<div className="grid grid-cols-3 p-4 text-center transition-colors hover:bg-gray-700/30">
							<div className="font-medium text-gray-300">Исправление багов</div>
							<div className="text-gray-400">Предлагает переустановить Windows</div>
							<div className="text-green-400 font-bold">Исправляет взглядом</div>
						</div>
						<div className="grid grid-cols-3 p-4 text-center transition-colors hover:bg-gray-700/30">
							<div className="font-medium text-gray-300">Эмпатия</div>
							<div className="text-gray-400">404 Not Found</div>
							<div className="text-green-400 font-bold">Поймет, простит и научит</div>
						</div>
					</div>
				</div>
			</div>

			{/* Photo Placeholder */}
			<div
				className={`relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-gray-600 bg-gray-800/30 transition-all duration-1000 ${
					isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
				}`}
				style={{ transitionDelay: '800ms' }}
			>
				<img src="/Shadi2.jpg" alt="Shadi" className="h-full w-full object-cover" />
			</div>
		</div>
	);
};

export default SkillsAndComparison;
