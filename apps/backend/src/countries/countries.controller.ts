import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

import { CountriesService } from './countries.service';
import { CountryResponseDto } from './dto/country-response.dto';
import type SortType from './sortType';

export class Test {
	@Get('test')
	getHealth() {
		return { status: 'ok', timestamp: new Date().toISOString() };
	}
}

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
	getCountries(
		@Query('start') start: number,
		@Query('end') end: number,
		@Query('search') search: string,
		@Query('sortBy') sortBy: SortType,
	): Promise<CountryResponseDto[]> {
		return this.countriesService.getCountries(start, end, search, sortBy);
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
	getCountry(@Param('countryId') countryId: string): Promise<CountryResponseDto | undefined> {
		return this.countriesService.getCountry(countryId);
	}
}
