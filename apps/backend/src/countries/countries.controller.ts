import { Countries } from '@legors/interfaces/country.interface';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CountriesService } from './countries.service';

@Controller()
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) {}

	@Get('/countries')
	@ApiOperation({ summary: 'Get inforamtion about countries' })
	@ApiResponse({ status: 201, description: 'Countries information' })
	getCountries(@Query('start') start: number, @Query('end') end: number): Promise<Countries> {
		console.log(start, end);
		return this.countriesService.getCountries(start, end);
	}
}
