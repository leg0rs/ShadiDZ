import { CountryResponseDto } from '@packages/utils/src/api/types.gen';
const Card = (props: CountryResponseDto) => {
	return (
		<div className="bg-card text-card-foreground p-4 rounded-lg m-3 shadow-custom-lg">
			<header className="flex items-center justify-between">
				<div className="text-3xl font-bold">{props.name.common}</div>
				<div className="text-5xl">{props.flag}</div>
			</header>
			<main className="grid grid-cols-2 gap-4 mt-4 border-t-2 border-gray-200 pt-4">
				<div className="min-w-0">
					<div className="text-2xl font-bold">Столица</div>
					<div className="text-2xl truncate" title={props.capital?.[0]}>
						{props.capital?.[0] ?? '—'}
					</div>
				</div>
				<div className="min-w-0 text-right">
					<div className="text-2xl font-bold">Регион</div>
					<div className="text-2xl truncate" title={props.region}>
						{props.region ?? '—'}
					</div>
				</div>
				<div className="min-w-0">
					<div className="text-2xl font-bold">Население</div>
					<div className="text-2xl truncate">{props.population?.toLocaleString() ?? '—'}</div>
				</div>
				<div className="min-w-0 text-right">
					<div className="text-2xl font-bold">Площадь</div>
					<div className="text-2xl truncate">{props.area?.toLocaleString() ?? '—'}</div>
				</div>
			</main>
		</div>
	);
};

export default Card;
