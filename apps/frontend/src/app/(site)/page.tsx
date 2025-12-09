'use client';

import { useEffect, useState } from 'react';

import Card from '@/components/card';
import { CountryResponseDto } from '@packages/utils/src/api/types.gen';
import { getCountriesAction } from '../actions';
const Page = () => {
	const [countries, setCountries] = useState<CountryResponseDto[]>([]);

	const GetCountries = async () => {
		const countries = await getCountriesAction(1, 48);
		console.log(countries);
		if (countries) {
			setCountries(countries);
		}
	};

	useEffect(() => {
		GetCountries();
	}, []);
	return (
		<div className="ml-4 mr-4">
			<input
				type="text"
				placeholder="Ввдеите"
				className="flex justify-self-end h-10 bg-card text-card-foreground rounded-lg p-2 m-4"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{countries.map((country) => (
					<Card key={country.cca2} {...country}></Card>
				))}
			</div>
		</div>
	);
};
export default Page;
