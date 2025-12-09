'use server';

import { type Countries } from '@legors/interfaces/country.interface';
import { createClient } from '@packages/utils/src/api/client/index';
import {
	countriesControllerGetCountries,
	countriesControllerGetCountry,
} from '@packages/utils/src/api/sdk.gen';
import { unstable_cache } from 'next/cache';

const client = createClient({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8080/v0',
});

const getCachedCountriesData = unstable_cache(
	async (params: { start: number; end: number }): Promise<Countries> => {
		const { data } = await countriesControllerGetCountries({
			client,
			query: params,
		});
		return data as Countries;
	},
	['countries-data-key'],
	{
		revalidate: 60,
		tags: ['countries'],
	},
);

const getCachedCountryData = (countryId: string) => {
	const cachedFn = unstable_cache(
		async () => {
			const { data } = await countriesControllerGetCountry({
				client,
				path: {
					countryId: countryId,
				},
			});
			return data;
		},
		['country-data-key', countryId],
		{
			revalidate: 60,
			tags: ['countries'],
		},
	);
	return cachedFn();
};

export async function getCountriesAction(start: number, end: number) {
	return await getCachedCountriesData({
		start: start,
		end: end,
	});
}

export async function getCountryAction(countryId: string) {
	return await getCachedCountryData(countryId);
}
