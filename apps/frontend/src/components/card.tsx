'use client';

import { CountryResponseDto } from '@packages/utils/src/api/types.gen';

interface CardProps extends CountryResponseDto {
	language: string;
}

const Card = (props: CardProps) => {
	const { language } = props;
	let cardText: string | undefined = undefined;
	console.log(props.translations);
	if (language === 'ru') {
		cardText = props.translations.rus.common;
	} else {
		cardText = props.name.common;
	}
	if (!cardText) {
		cardText = '—';
	}
	return (
		<div className="bg-card text-card-foreground cursor-pointer p-4 rounded-lg m-3 shadow-custom-lg hover-lift">
			<header className="flex items-center justify-between">
				<div className="text-3xl font-bold">{cardText}</div>
				<div className="text-5xl">{props.flag}</div>
			</header>
			<main className="grid grid-cols-2 gap-4 mt-4 border-t-2 border-gray-200 pt-4">
				<div className="min-w-0">
					<div className="text-2xl font-bold">Столица</div>
					<div className="text-2xl" title={props.capital?.[0]}>
						{props.capital?.[0] ?? '—'}
					</div>
				</div>
				<div className="min-w-0 text-right">
					<div className="text-2xl font-bold">Регион</div>
					<div className="text-2xl" title={props.region}>
						{props.region ?? '—'}
					</div>
				</div>
				<div className="min-w-0">
					<div className="text-2xl font-bold">Население</div>
					<div className="text-2xl">{props.population?.toLocaleString() ?? '—'}</div>
				</div>
				<div className="min-w-0 text-right">
					<div className="text-2xl font-bold">Площадь</div>
					<div className="text-2xl">{props.area?.toLocaleString() ?? '—'}</div>
				</div>
			</main>
		</div>
	);
};

export default Card;
