'use server';

import * as sdk from '@packages/utils/src/api/sdk.gen';
import type { CountriesControllerGetCountriesData } from '@packages/utils/src/api/types.gen';

import { myApiClient } from '../api/config-client';

export async function getCountryAction(countryId: string) {
	const { data } = await sdk.countriesControllerGetCountry({
		client: myApiClient,
		path: { countryId },
	});

	return data;
}

export async function getCountriesAction(params: CountriesControllerGetCountriesData['query']) {
	const { data } = await sdk.countriesControllerGetCountries({
		client: myApiClient,
		query: params,
		next: { revalidate: 0 },
	} as unknown as Parameters<typeof sdk.countriesControllerGetCountries>[0]);
	return data;
}
