'use client';

import { useState } from 'react';

import { Button } from '@packages/ui/src/components/ui/button';
import { CountryResponseDto } from '@packages/utils/src/api/types.gen';
import { getCountriesAction } from '../actions';
const Page = () => {
	const [countries, setCountries] = useState<CountryResponseDto[]>([]);

	const GetCountries = async () => {
		const countries = await getCountriesAction(1, 12);
		console.log(countries);
		if (countries) {
			setCountries(countries);
		}
	};
	return (
		<div className="">
			<Button onClick={GetCountries}>Get Countries</Button>
			{countries.map((country) => (
				<div key={country.cca2} className="text-2xl">
					{country.cca2} - {country.name.common}
				</div>
			))}
		</div>
	);
};
export default Page;
