import { useEffect, useState } from 'react';

const Achivments = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-gray-900 px-4 py-10 text-white md:flex-row md:flex-wrap xl:flex-nowrap">
			<div
				className={`flex w-full max-w-md transform flex-col gap-6 rounded-2xl border border-gray-700 bg-gray-800/50 p-8 shadow-2xl backdrop-blur-sm transition-all duration-1000 hover:border-red-500/50 hover:shadow-red-500/10 ${
					isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
				}`}
			>
				<div className="flex items-center gap-4 border-b border-gray-700 pb-4">
					<div>
						<h2 className="text-2xl font-bold text-white">Codewars</h2>
						<a href="https://www.codewars.com/users/FloydanTheBeast" className="text-gray-400">
							@FloydanTheBeast
						</a>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="rounded-xl bg-gray-900/50 p-4 text-center transition-colors hover:bg-gray-900">
						<div className="text-3xl font-bold text-red-500">3 kyu</div>
						<div className="text-xs text-gray-400 uppercase tracking-wider">Ранг Мастера</div>
					</div>
					<div className="rounded-xl bg-gray-900/50 p-4 text-center transition-colors hover:bg-gray-900">
						<div className="text-3xl font-bold text-white">1,552</div>
						<div className="text-xs text-gray-400 uppercase tracking-wider">Уровень крутости</div>
					</div>
					<div className="rounded-xl bg-gray-900/50 p-4 text-center transition-colors hover:bg-gray-900">
						<div className="text-3xl font-bold text-white">Top 2.1%</div>
						<div className="text-xs text-gray-400 uppercase tracking-wider">Элита Мира</div>
					</div>
					<div className="rounded-xl bg-gray-900/50 p-4 text-center transition-colors hover:bg-gray-900">
						<div className="text-3xl font-bold text-white">85</div>
						<div className="text-xs text-gray-400 uppercase tracking-wider">Побежденных Задач</div>
					</div>
				</div>

				<div className="mt-2">
					<div className="mb-2 flex justify-between text-sm">
						<span className="text-gray-400">Любимое Оружие</span>
						<span className="font-bold text-yellow-400">JavaScript </span>
					</div>
					<div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
						<div className="h-full w-[85%] rounded-full bg-linear-to-r from-red-600 to-yellow-500"></div>
					</div>
				</div>
			</div>

			<div
				className={`flex w-full max-w-md transform flex-col gap-6 rounded-2xl border border-gray-700 bg-gray-800/50 p-8 shadow-2xl backdrop-blur-sm transition-all duration-1000 delay-300 hover:border-violet-500/50 hover:shadow-violet-500/10 ${
					isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
				}`}
			>
				<div className="flex items-center gap-4 border-b border-gray-700 pb-4">
					<div>
						<h2 className="text-2xl font-bold text-white">GitHub</h2>
						<a href="https://github.com/FloydanTheBeast" className="text-gray-400">
							@FloydanTheBeast
						</a>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between rounded-lg bg-gray-900/50 p-3 transition-colors hover:bg-gray-900">
						<span className="text-gray-400">Репозиториев</span>
						<span className="text-xl font-bold text-white">36 (Мировых проектов)</span>
					</div>
					<div className="flex items-center justify-between rounded-lg bg-gray-900/50 p-3 transition-colors hover:bg-gray-900">
						<span className="text-gray-400">Последователей</span>
						<span className="text-xl font-bold text-white">46 (Лучшие ученики)</span>
					</div>

					<div className="pt-2">
						<h3 className="mb-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">
							Легендарные Проекты
						</h3>
						<ul className="space-y-2">
							<li className="group flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-700/50">
								<span className="font-medium text-blue-400 group-hover:underline">PhysCademy</span>
								<span className="flex items-center gap-1 text-xs text-gray-500">
									<span>★</span> 13 (Прорыв в науке)
								</span>
							</li>
							<li className="group flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-700/50">
								<span className="font-medium text-blue-400 group-hover:underline">
									hse-lyceum-web-2025
								</span>
								<span className="flex items-center gap-1 text-xs text-gray-500">
									<span>★</span> 4 (Будущее веба)
								</span>
							</li>
							<li className="group flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-700/50">
								<span className="font-medium text-blue-400 group-hover:underline">
									CellularAutomataVisualizer
								</span>
								<span className="flex items-center gap-1 text-xs text-gray-500">
									<span>★</span> 4 (Магия кода)
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Diploma Card */}
			<div
				className={`flex w-full max-w-md transform flex-col gap-6 rounded-2xl border border-gray-700 bg-gray-800/50 p-8 shadow-2xl backdrop-blur-sm transition-all duration-1000 delay-500 hover:border-blue-500/50 hover:shadow-blue-500/10 ${
					isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
				}`}
			>
				<div className="flex items-center gap-4 border-b border-gray-700 pb-4">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl text-white shadow-lg shadow-blue-600/20">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-8 w-8"
						>
							<path d="M22 10v6M2 10l10-5 10 5-10 5z" />
							<path d="M6 12v5c3 3 9 3 12 0v-5" />
						</svg>
					</div>
					<div>
						<h2 className="text-2xl font-bold text-white">Диплом ВШЭ</h2>
						<a
							href="https://www.hse.ru/ba/se/students/diplomas/834591740"
							className="text-gray-400 transition-colors hover:text-blue-400"
						>
							TechPath
						</a>
					</div>
				</div>

				<div className="space-y-4">
					<p className="text-sm leading-relaxed text-gray-300">
						Грандиозная платформа, объединяющая знания мира IT! Шади создал инструмент, который
						меняет судьбы, выстраивая идеальные пути обучения.
					</p>

					<div className="grid grid-cols-2 gap-3">
						<div className="rounded-lg bg-gray-900/50 p-3 text-center">
							<div className="font-bold text-blue-400">Frontend</div>
							<div className="text-xs text-gray-500">Мастерство</div>
						</div>
						<div className="rounded-lg bg-gray-900/50 p-3 text-center">
							<div className="font-bold text-blue-400">Backend</div>
							<div className="text-xs text-gray-500">Надежность</div>
						</div>
						<div className="rounded-lg bg-gray-900/50 p-3 text-center">
							<div className="font-bold text-blue-400">Roadmaps</div>
							<div className="text-xs text-gray-500">Путь к успеху</div>
						</div>
						<div className="rounded-lg bg-gray-900/50 p-3 text-center">
							<div className="font-bold text-blue-400">ВШЭ</div>
							<div className="text-xs text-gray-500">Альма-матер</div>
						</div>
					</div>

					<div className="border-t border-gray-700 pt-2">
						<div className="flex items-center justify-between text-sm">
							<span className="text-gray-400">Оценка</span>
							<span className="font-bold text-green-400">Безупречно (10/10)</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Achivments;
