const Main = () => {
	return (
		<div className="flex w-full flex-col items-center justify-around gap-10 px-4 py-10 md:flex-row">
			<div className="max-w-lg rounded-2xl border border-gray-700 bg-gray-800/50 p-8 text-white shadow-2xl backdrop-blur-sm transition-all hover:border-gray-600">
				<h2 className="mb-6 text-3xl font-bold text-red-500">Основная информация</h2>
				<div className="space-y-4 text-lg text-gray-300">
					<div className="flex items-center gap-3 transition-colors hover:text-white">
						<span className="h-2 w-2 shrink-0 rounded-full bg-red-500"></span>
						<p>Лучший frontend разработчик в Avito</p>
					</div>
					<div className="flex items-center gap-3 transition-colors hover:text-white">
						<span className="h-2 w-2 shrink-0 rounded-full bg-red-500"></span>
						<p>Выпускник лицея и университета ВШЭ</p>
					</div>
					<div className="flex items-center gap-3 transition-colors hover:text-white">
						<span className="h-2 w-2 shrink-0 rounded-full bg-red-500"></span>
						<p>Лучший преподаватель всего мира</p>
					</div>
					<div className="flex items-center gap-3 transition-colors hover:text-white">
						<span className="h-2 w-2 shrink-0 rounded-full bg-red-500"></span>
						<p>Создатель множества проектов</p>
					</div>
					<div className="flex items-center gap-3 transition-colors hover:text-white">
						<span className="h-2 w-2 shrink-0 rounded-full bg-red-500"></span>
						<p>И прекрасный человек</p>
					</div>
				</div>
			</div>
			<div className="group relative">
				<div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-red-600 to-violet-600 opacity-25 blur transition duration-1000 group-hover:opacity-75 group-hover:duration-200"></div>
				<img
					src="/ShadiMain.jpeg"
					alt="Shadi Main"
					className="relative h-auto w-full max-w-md rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
					onClick={() => (window.location.href = 'https://github.com/FloydanTheBeast')}
				/>
			</div>
		</div>
	);
};

export default Main;
