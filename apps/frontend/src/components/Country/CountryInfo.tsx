'use client';
import { Button } from '@packages/ui/src/components/ui/button';
import { CountryResponseDto } from '@packages/utils/src/api/types.gen';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import getLanguage from '@/utils/getlaguade';

import InfoSection from './InfoSection';

const CountryInfo = ({ data }: { data: CountryResponseDto }) => {
	const [language, setLanguage] = useState<string>('ru');
	let cardText: string | undefined = undefined;
	if (language === 'ru') {
		cardText = data.translations.rus.common;
	} else {
		cardText = data.name.common;
	}
	if (!cardText) {
		cardText = '—';
	}
	useEffect(() => {
		const init = async () => {
			const lang = await getLanguage();
			setLanguage(lang);
		};
		init();
	}, []);
	return (
		<main className="w-full max-w-5xl mx-auto px-4 py-8">
			<Button
				className="absolute top-20 left-8"
				onClick={() => redirect('/countries')}
				variant="outline"
			>
				<ArrowLeft /> Назад
			</Button>
			<div className="flex flex-col items-center gap-4 mb-8">
				<img
					className="mb-3"
					src={`https://flagcdn.com/160x120/${data.cca2.toLowerCase()}.png`}
					width="160"
					height="120"
					alt={`${cardText}`}
				></img>
				<div className="text-5xl font-bold">{cardText}</div>
				<div className="text-2xl text-muted-foreground">{data.name.official}</div>
			</div>

			<div className="flex flex-col md:flex-row justify-between w-full mb-8 gap-4 md:gap-40">
				<div className="bg-secondary px-6 h-13 items-center justify-center flex rounded-xl text-[1.2rem] flex-1">
					Население | {data.population?.toLocaleString() ?? '—'}
				</div>
				<div className="bg-secondary px-6 h-13 items-center justify-center flex rounded-xl text-[1.2rem] flex-1">
					Площадь км² | {data.area?.toLocaleString() ?? '—'}
				</div>
			</div>

			<div className="space-y-8">
				<InfoSection
					title="Основная информация"
					items={[
						{ label: 'Официальное название', value: data.name.official ?? '—' },
						{ label: 'Столица', value: data.capital?.join(', ') ?? '—' },
						{ label: 'Регион', value: data.region ?? '—' },
						{ label: 'Подрегион', value: data.subregion ?? '—' },
						{ label: 'На суше', value: data.landlocked ? 'Да' : 'Нет' },
						{
							label: 'Соседние страны',
							value: data.borders?.length ? data.borders.join(', ') : 'Нет',
						},
					]}
				/>

				<InfoSection
					title="Коды и идентификаторы"
					items={[
						{ label: 'Код страны (ISO 3166-1 alpha-2)', value: data.cca2 ?? '—' },
						{ label: 'Код страны (ISO 3166-1 alpha-3)', value: data.cca3 ?? '—' },
						{ label: 'Числовой код', value: data.ccn3 ?? '—' },
						{ label: 'Top Level Domain', value: data.tld?.join(', ') ?? '—' },
						{
							label: 'Телефонный код',
							value: data.idd?.root ? `${data.idd.root}${data.idd.suffixes?.[0] ?? ''}` : '—',
						},
						{ label: 'Статус', value: data.status ?? '—' },
					]}
				/>

				{data.languages && Object.keys(data.languages).length > 0 && (
					<InfoSection
						title="Языки"
						items={Object.entries(data.languages).map(([code, name]) => ({
							label: name as string,
							value: code.toUpperCase(),
						}))}
					/>
				)}

				{data.currencies && Object.keys(data.currencies).length > 0 && (
					<InfoSection
						title="Валюта"
						items={Object.entries(data.currencies).map(([code, curr]) => {
							const currency = curr as { name?: string; symbol?: string };
							return {
								label: currency.name ?? code,
								value: `${currency.symbol ?? ''} (${code})`,
							};
						})}
					/>
				)}

				<InfoSection
					title="Названия на других языках"
					items={[
						{ label: 'Русский', value: data.translations.rus.common ?? '—' },
						{ label: 'Английский', value: data.name.common ?? '—' },
						{ label: 'Немецкий', value: data.translations.deu?.common ?? '—' },
						{ label: 'Французский', value: data.translations.fra?.common ?? '—' },
						{ label: 'Испанский', value: data.translations.spa?.common ?? '—' },
						{ label: 'Итальянский', value: data.translations.ita?.common ?? '—' },
						{ label: 'Португальский', value: data.translations.por?.common ?? '—' },
						{ label: 'Китайский', value: data.translations.zho?.common ?? '—' },
						{ label: 'Японский', value: data.translations.jpn?.common ?? '—' },
						{ label: 'Корейский', value: data.translations.kor?.common ?? '—' },
					]}
				/>
			</div>
		</main>
	);
};

export default CountryInfo;
