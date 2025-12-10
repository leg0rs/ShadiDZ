import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { CountryResponseDto } from './dto/country-response.dto';
import SortType from './sortType';
async function getData() {
	const data = await readFile(join(__dirname, '..', '..', 'data', 'data.json'), 'utf-8');
	return JSON.parse(data) as CountryResponseDto[];
}

function sortData(countries: CountryResponseDto[], sortBy: SortType): CountryResponseDto[] {
	const sorted = [...countries];
	switch (sortBy) {
		case 'PopUP':
			return sorted.sort((a, b) => (b.population || 0) - (a.population || 0));
		case 'PopDown':
			return sorted.sort((a, b) => (a.population || 0) - (b.population || 0));
		case 'AreaUP':
			return sorted.sort((a, b) => (b.area || 0) - (a.area || 0));
		case 'AreaDown':
			return sorted.sort((a, b) => (a.area || 0) - (b.area || 0));
		case 'Region':
			return sorted.sort((a, b) => (a.region || '').localeCompare(b.region || ''));
		default:
			return sorted;
	}
}

@Injectable()
export class CountriesService {
	async getCountries(
		start: number,
		end: number,
		search: string,
		sortBy: SortType,
	): Promise<CountryResponseDto[]> {
		const data = await getData();
		const filteredData = data.filter((country: CountryResponseDto) => {
			// Поиск в английском названии
			if (country.name.common.toLowerCase().includes(search.toLowerCase())) {
				return true;
			}
			// Поиск во всех переводах
			for (const translation of Object.values(country.translations)) {
				if (translation.common.toLowerCase().includes(search.toLowerCase())) {
					return true;
				}
			}
			return false;
		});
		// Всегда возвращаем срез, даже если результатов мало
		const sortedData = sortData(filteredData, sortBy);
		return sortedData.slice(start - 1, end) as unknown as CountryResponseDto[];
	}
	async getCountry(code: string): Promise<CountryResponseDto | undefined> {
		const data = await getData();
		const result = data.find((country: CountryResponseDto) => country.cca2 === code);
		if (result) return result;
		return undefined;
	}
}
