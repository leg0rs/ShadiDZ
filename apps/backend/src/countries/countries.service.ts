import { Countries, Country } from '@legors/interfaces/country.interface';
import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

async function getData() {
	const data = await readFile(join(__dirname, '..', '..', 'data', 'data.json'), 'utf-8');
	return JSON.parse(data) as Countries;
}

@Injectable()
export class CountriesService {
	async getCountries(start: number, end: number): Promise<Countries> {
		const data = await getData();
		console.log(data.slice(start - 1, end));
		return data.slice(start - 1, end) as unknown as Countries;
	}
	async getCountry(code: string): Promise<Country | undefined> {
		const data = await getData();
		const result = data.find((country: Country) => country.cca2 === code);
		if (result) return result;
		return undefined;
	}
}
