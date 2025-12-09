import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { CountryResponseDto } from './dto/country-response.dto';
async function getData() {
	const data = await readFile(join(__dirname, '..', '..', 'data', 'data.json'), 'utf-8');
	return JSON.parse(data) as CountryResponseDto[];
}

@Injectable()
export class CountriesService {
	async getCountries(start: number, end: number, search: string): Promise<CountryResponseDto[]> {
		const data = await getData();
		const filteredData = data.filter((country: CountryResponseDto) => {
			for (const translation of Object.values(country.translations)) {
				if (translation.common.toLowerCase().includes(search.toLowerCase())) {
					return true;
				}
			}
			return false;
		});
		return filteredData.slice(start - 1, end) as unknown as CountryResponseDto[];
	}
	async getCountry(code: string): Promise<CountryResponseDto | undefined> {
		const data = await getData();
		const result = data.find((country: CountryResponseDto) => country.cca2 === code);
		if (result) return result;
		return undefined;
	}
}
