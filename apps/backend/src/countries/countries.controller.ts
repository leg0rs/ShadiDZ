import { Countries, Country } from '@legors/interfaces/country.interface';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

import { CountriesService } from './countries.service';
import { CountryResponseDto } from './dto/country-response.dto';

@Controller('/countries')
@ApiExtraModels(CountryResponseDto)
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) {}

	@Get()
	@ApiOperation({ summary: 'Get information about countries' })
	@ApiOkResponse({
		description: 'Countries information',
		schema: {
			type: 'array',
			items: { $ref: getSchemaPath(CountryResponseDto) },
		},
	})
	getCountries(@Query('start') start: number, @Query('end') end: number): Promise<Countries> {
		console.log(start, end);
		return this.countriesService.getCountries(start, end);
	}

	@Get(':countryId')
	@ApiOperation({ summary: 'Get information about a specific country' })
	@ApiOkResponse({
		description: 'Country information (returns null if country not found)',
		type: CountryResponseDto,
		schema: {
			oneOf: [{ $ref: getSchemaPath(CountryResponseDto) }, { type: 'null' }],
		},
	})
	getCountry(@Param('countryId') countryId: string): Promise<Country | undefined> {
		return this.countriesService.getCountry(countryId);
	}
}
