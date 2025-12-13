'use client';

import countryProps from '@/types/countryProps';
import { redirect } from 'next/navigation';

const Card = (props: countryProps) => {
	const { language } = props;
	let cardText: string | undefined = undefined;
	if (language === 'ru') {
		cardText = props.translations.rus.common;
	} else {
		cardText = props.name.common;
	}
	if (!cardText) {
		cardText = '—';
	}
	return (
		<div
			className="bg-secondary text-card-foreground cursor-pointer p-4 rounded-lg m-3 shadow-custom-lg hover-lift"
			onClick={() => {
				redirect(`/country/${props.cca2}`);
			}}
		>
			<header className="flex items-center justify-between gap-2">
				<div className="text-2xl font-bold truncate" title={cardText}>
					{cardText}
				</div>
				<div className="text-5xl shrink-0">{props.flag}</div>
			</header>
			<main className="grid grid-cols-2 gap-4 mt-4 border-t-2 border-gray-200 pt-4">
				<div className="min-w-0 ">
					<div className="text-2xl font-bold">Регион</div>
					<div className="text-2xl" title={props.region}>
						{props.region ?? '—'}
					</div>
				</div>
				<div className="min-w-0 text-right">
					<div className="text-2xl font-bold">Столица</div>
					<div className="text-2xl" title={props.capital?.[0]}>
						{props.capital?.[0] ?? '—'}
					</div>
				</div>
				<div className="min-w-0">
					<div className="text-2xl font-bold">Население</div>
					<div className="text-2xl">{props.population?.toLocaleString() ?? '—'}</div>
				</div>
				<div className="min-w-0 text-right">
					<div className="text-2xl font-bold">Площадь</div>
					<div className="text-2xl">{props.area?.toLocaleString() ?? '—'} км²</div>
				</div>
			</main>
		</div>
	);
};

export default Card;
