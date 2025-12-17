import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

import { CountriesService } from './countries.service';
import { CountryResponseDto } from './dto/country-response.dto';
import { GetCountriesQueryDto } from './dto/GetCountriesQuery.dto';
import type SortType from './sortType';

@Controller('/countries')
@ApiExtraModels(CountryResponseDto)
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) {}

	@Get('health')
	getHealth() {
		return { status: 'ok', timestamp: new Date().toISOString() };
	}

	@Get()
	@ApiOperation({ summary: 'Get information about countries' })
	@ApiOkResponse({
		description: 'Countries information',
		schema: {
			type: 'array',
			items: { $ref: getSchemaPath(CountryResponseDto) },
		},
	})
	getCountries(@Query() query: GetCountriesQueryDto): Promise<CountryResponseDto[]> {
		console.log(query);
		return this.countriesService.getCountries(
			query.start,
			query.end,
			query.search || '',
			(query.sortBy as SortType) || 'None',
		);
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
