'use client';

import { type Countries } from '@legors/interfaces/country.interface';
import { useState } from 'react';

import { getCountriesAction } from '../actions';
const Page = () => {
	const [countries, setCountries] = useState<Countries>([]);

	const GetCountries = async () => {
		const countries = await getCountriesAction(1, 2);
		setCountries(countries);
	};
	return <div className=""></div>;
};

export default Page;
