'use client';

import { CountryResponseDto } from '@packages/utils/src/api/types.gen';
import { useEffect, useState } from 'react';

import Card from '@/components/card';
import getLanguage from '@/utils/getlaguade';

import { getCountriesAction } from '../actions';
const Page = () => {
	const [countries, setCountries] = useState<CountryResponseDto[]>([]);
	const [search, setSearch] = useState<string>('');
	const [language, setLanguage] = useState<string>('ru');

	const GetCountries = async () => {
		const countries = await getCountriesAction({ start: 1, end: 48, search });
		if (countries) {
			setCountries(countries);
		}
	};

	useEffect(() => {
		const init = async () => {
			const lang = await getLanguage();
			setLanguage(lang);
			GetCountries();
		};
		init();
	}, []);
	return (
		<div className="mx-4 mb-4">
			<input
				type="text"
				placeholder="Ввдеите название страны"
				className="flex justify-self-end h-10 bg-card text-card-foreground rounded-lg p-2 m-4"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
					GetCountries();
				}}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{countries.map((country) => (
					<Card key={country.cca2} {...country} language={language}></Card>
				))}
			</div>
		</div>
	);
};
export default Page;
