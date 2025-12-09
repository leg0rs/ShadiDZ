import { Countries, Country } from '@legors/interfaces/country.interface';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CountriesService } from './countries.service';

@Controller('/countries')
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) {}

	@Get()
	@ApiOperation({ summary: 'Get inforamtion about countries' })
	@ApiResponse({ status: 200, description: 'Countries information' })
	getCountries(@Query('start') start: number, @Query('end') end: number): Promise<Countries> {
		console.log(start, end);
		return this.countriesService.getCountries(start, end);
	}

	@Get(':countryId')
	@ApiOperation({ summary: 'Get information about a specific country' })
	@ApiResponse({ status: 200, description: 'Country information' })
	getCountry(@Param('countryId') countryId: string): Promise<Country | undefined> {
		return this.countriesService.getCountry(countryId);
	}
}
