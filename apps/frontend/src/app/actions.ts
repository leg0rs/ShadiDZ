'use server';

import * as sdk from '@packages/utils/src/api/sdk.gen';
import { myApiClient } from '../api/congit-client';

export async function getCountryAction(countryId: string) {
	const { data } = await sdk.countriesControllerGetCountry({
		client: myApiClient,
		path: { countryId },
	});

	return data;
}

export async function getCountriesAction(params: any) {
	const { data } = await sdk.countriesControllerGetCountries({
		client: myApiClient,
		query: params,
		...({
			next: { revalidate: 0 },
		} as any),
	});
	return data;
}
