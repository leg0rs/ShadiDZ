import { useEffect, useState } from 'react';

const Guide = () => {
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

		const element = document.getElementById('roadmap-section');
		if (element) observer.observe(element);

		return () => {
			if (element) observer.unobserve(element);
		};
	}, []);

	const steps = [
		{
			title: 'Адский Отбор',
			description:
				'Пройти 9 кругов ада вступительных испытаний в Лицей НИУ ВШЭ. Выжить, не потеряв рассудок.',
			icon: '🔥',
			color: 'from-red-600 to-orange-600',
		},
		{
			title: 'Путь Воина: МатИнфо',
			description:
				'Выбрать направление Математика и Информатика. Понять, что сон — это для слабаков.',
			icon: '💻',
			color: 'from-blue-600 to-cyan-600',
		},
		{
			title: 'Судьбоносный Выбор',
			description:
				'Выбрать электив "Веб-разработка". Точка невозврата. Твоя жизнь больше не будет прежней.',
			icon: '✨',
			color: 'from-purple-600 to-pink-600',
		},
		{
			title: 'Первая Встреча',
			description:
				'Увидеть Шади. Почувствовать энергию его вайба. Понять, что перед тобой не просто учитель, а легенда.',
			icon: '😎',
			color: 'from-yellow-500 to-amber-500',
		},
		{
			title: 'Обучение у Легенды',
			description:
				'Впитывать знания лучшего преподавателя в мире. Писать код, который работает (иногда).',
			icon: '👑',
			color: 'from-green-500 to-emerald-500',
		},
		{
			title: 'Просветление',
			description:
				'Сдать все дедлайны за ночь до сдачи. Получить одобрительный кивок от Шади. Достичь нирваны.',
			icon: '🧘',
			color: 'from-indigo-500 to-violet-500',
		},
	];

	return (
		<div
			id="roadmap-section"
			className="flex w-full flex-col items-center border-gray-700 px-4 py-20 text-white"
		>
			<h2 className="mb-16 text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
				Путь к Успеху
			</h2>
			<div className="relative w-full max-w-4xl">
				{/* Vertical Line */}
				<div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gray-700"></div>

				<div className="space-y-16">
					{steps.map((step, index) => (
						<div
							key={index}
							className={`relative flex items-center justify-between ${
								index % 2 === 0 ? 'flex-row-reverse' : ''
							}`}
						>
							{/* Content */}
							<div className="w-[45%]">
								<div
									className={`transform rounded-xl border border-gray-700 bg-gray-800/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:border-gray-500 ${
										isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
									}`}
									style={{ transitionDelay: `${index * 200}ms` }}
								>
									<h3
										className={`mb-2 text-xl font-bold text-transparent bg-clip-text bg-linear-to-r ${step.color}`}
									>
										{step.title}
									</h3>
									<p className="text-sm text-gray-300">{step.description}</p>
								</div>
							</div>

							{/* Icon */}
							<div className="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-gray-900 bg-gray-800 shadow-lg">
								<span className="text-2xl">{step.icon}</span>
							</div>

							{/* Empty space for the other side */}
							<div className="w-[45%]"></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Guide;
