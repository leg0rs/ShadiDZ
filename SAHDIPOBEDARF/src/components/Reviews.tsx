import { useEffect, useState } from 'react';

const Reviews = () => {
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

		const element = document.getElementById('reviews-section');
		if (element) observer.observe(element);

		return () => {
			if (element) observer.unobserve(element);
		};
	}, []);

	const reviews = [
		{
			name: 'Илон Маск',
			role: 'CEO SpaceX & Tesla',
			text: 'Я хотел нанять его в SpaceX для переписывания автопилота, но он сказал, что у него пара у 10-го класса. Пришлось отступить. Уважаю выбор настоящего гения.',
			initials: 'EM',
			color: 'from-blue-500 to-blue-700',
		},
		{
			name: 'Линус Торвальдс',
			role: 'Создатель Linux',
			text: 'Я написал ядро Linux, но если бы меня в свое время учил Шади, я бы написал его за одни выходные. Этот человек видит байт-код в Матрице.',
			initials: 'LT',
			color: 'from-yellow-500 to-orange-600',
		},
		{
			name: 'Павел Дуров',
			role: 'Основатель Telegram',
			text: 'Вернул стену ВКонтакте только ради того, чтобы написать на ней, насколько крут этот преподаватель. Его код чище моей диеты.',
			initials: 'ПД',
			color: 'from-blue-400 to-cyan-500',
		},
		{
			name: 'Джейсон Стетхем',
			role: 'Философ XXI века',
			text: 'Если Шади сказал, что код работает — значит он работает, даже если компилятор выдает ошибку. Компилятор просто еще не дорос до его уровня.',
			initials: 'JS',
			color: 'from-gray-500 to-gray-700',
		},
	];

	return (
		<div
			id="reviews-section"
			className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 px-4 py-20 text-white"
		>
			<h2 className="mb-16 text-center text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-red-500">
				Что говорят Великие
			</h2>

			<div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
				{reviews.map((review, index) => (
					<div
						key={index}
						className={`transform rounded-2xl border border-gray-700 bg-gray-800/50 p-8 shadow-2xl backdrop-blur-sm transition-all duration-700 hover:-translate-y-2 hover:border-gray-500 hover:shadow-xl ${
							isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
						}`}
						style={{ transitionDelay: `${index * 150}ms` }}
					>
						<div className="mb-6 flex items-center gap-4">
							<div
								className={`flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br ${review.color} text-xl font-bold text-white shadow-lg`}
							>
								{review.initials}
							</div>
							<div>
								<h3 className="text-xl font-bold text-white">{review.name}</h3>
								<p className="text-sm text-gray-400">{review.role}</p>
							</div>
						</div>
						<div className="relative">
							<span className="absolute -left-2 -top-4 text-6xl text-gray-700 opacity-50">"</span>
							<p className="relative z-10 text-lg italic leading-relaxed text-gray-300">
								{review.text}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Reviews;
