/* 
этот файл был написан с помощью AI а именно Claude Sonnet 4.5,
так как я бы рехнулся ручками писать много строк однообразного DTO

DTO была проверена и она соотвествует json-схеме, прошу понять меня и не судить строго
*/

import { ApiProperty } from '@nestjs/swagger';

export class LanguageNameDto {
	@ApiProperty({ example: 'Aruba', description: 'Official name in the language' })
	official!: string;

	@ApiProperty({ example: 'Aruba', description: 'Common name in the language' })
	common!: string;
}

export class CountryNameDto {
	@ApiProperty({ example: 'Aruba', description: 'Common name of the country' })
	common!: string;

	@ApiProperty({ example: 'Aruba', description: 'Official name of the country' })
	official!: string;

	@ApiProperty({
		example: {
			nld: { official: 'Aruba', common: 'Aruba' },
			pap: { official: 'Aruba', common: 'Aruba' },
		},
		description: 'Native names in different languages',
		type: 'object',
		additionalProperties: {
			type: 'object',
			properties: {
				official: { type: 'string' },
				common: { type: 'string' },
			},
		},
	})
	native!: Record<string, LanguageNameDto>;
}

export class CurrencyDto {
	@ApiProperty({ example: 'Aruban florin', description: 'Currency name' })
	name!: string;

	@ApiProperty({ example: 'ƒ', description: 'Currency symbol' })
	symbol!: string;
}

export class IddDto {
	@ApiProperty({ example: '+2', description: 'International dialing root code' })
	root!: string;

	@ApiProperty({ example: ['97'], description: 'International dialing suffixes', type: [String] })
	suffixes!: string[];
}

export class TranslationDto {
	@ApiProperty({ example: 'أروبا', description: 'Official translation' })
	official!: string;

	@ApiProperty({ example: 'أروبا', description: 'Common translation' })
	common!: string;
}

export class DemonymDto {
	@ApiProperty({ example: 'Aruban', description: 'Female demonym' })
	f!: string;

	@ApiProperty({ example: 'Aruban', description: 'Male demonym' })
	m!: string;
}

export class CountryResponseDto {
	@ApiProperty({
		type: CountryNameDto,
		description: 'Country name information',
		example: {
			common: 'Aruba',
			official: 'Aruba',
			native: {
				nld: { official: 'Aruba', common: 'Aruba' },
				pap: { official: 'Aruba', common: 'Aruba' },
			},
		},
	})
	name!: CountryNameDto;

	@ApiProperty({ example: ['.aw'], description: 'Top-level domain', type: [String] })
	tld!: string[];

	@ApiProperty({ example: 'AW', description: 'ISO 3166-1 alpha-2 code' })
	cca2!: string;

	@ApiProperty({ example: '533', description: 'ISO 3166-1 numeric code' })
	ccn3!: string;

	@ApiProperty({ example: 'ABW', description: 'ISO 3166-1 alpha-3 code' })
	cca3!: string;

	@ApiProperty({ example: 'ARU', description: 'International Olympic Committee code' })
	cioc!: string;

	@ApiProperty({
		example: false,
		description: 'Whether the country is independent',
		required: false,
	})
	independent?: boolean;

	@ApiProperty({ example: 'officially-assigned', description: 'Status of the country' })
	status!: string;

	@ApiProperty({ example: false, description: 'Whether the country is a UN member' })
	unMember!: boolean;

	@ApiProperty({ example: '', description: 'UN regional group' })
	unRegionalGroup!: string;

	@ApiProperty({
		example: {
			AWG: { name: 'Aruban florin', symbol: 'ƒ' },
		},
		description: 'Currencies used in the country',
		type: 'object',
		additionalProperties: {
			type: 'object',
			properties: {
				name: { type: 'string' },
				symbol: { type: 'string' },
			},
		},
	})
	currencies!: Record<string, CurrencyDto>;

	@ApiProperty({
		type: IddDto,
		description: 'International dialing code information',
		example: { root: '+2', suffixes: ['97'] },
	})
	idd!: IddDto;

	@ApiProperty({ example: ['Oranjestad'], description: 'Capital cities', type: [String] })
	capital!: string[];

	@ApiProperty({ example: ['AW'], description: 'Alternative spellings', type: [String] })
	altSpellings!: string[];

	@ApiProperty({ example: 'Americas', description: 'Geographic region' })
	region!: string;

	@ApiProperty({ example: 'Caribbean', description: 'Geographic subregion' })
	subregion!: string;

	@ApiProperty({
		example: { nld: 'Dutch', pap: 'Papiamento' },
		description: 'Languages spoken in the country',
		type: 'object',
		additionalProperties: { type: 'string' },
	})
	languages!: Record<string, string>;

	@ApiProperty({
		example: {
			ara: { official: 'أروبا', common: 'أروبا' },
			eng: { official: 'Aruba', common: 'Aruba' },
			rus: { official: 'Аруба', common: 'Аруба' },
		},
		description: 'Translations of country name in different languages',
		type: 'object',
		additionalProperties: {
			type: 'object',
			properties: {
				official: { type: 'string' },
				common: { type: 'string' },
			},
		},
	})
	translations!: Record<string, TranslationDto>;

	@ApiProperty({
		example: [12.5, -69.96666666],
		description: 'Latitude and longitude coordinates',
		type: [Number],
	})
	latlng!: number[];

	@ApiProperty({ example: false, description: 'Whether the country is landlocked' })
	landlocked!: boolean;

	@ApiProperty({
		example: [],
		description: 'Border country codes (ISO 3166-1 alpha-3)',
		type: [String],
	})
	borders!: string[];

	@ApiProperty({ example: 180, description: 'Area in square kilometers' })
	area!: number;

	@ApiProperty({ example: '🇦🇼', description: 'Country flag emoji' })
	flag!: string;

	@ApiProperty({
		example: {
			eng: { f: 'Aruban', m: 'Aruban' },
			fra: { f: 'Arubaise', m: 'Arubais' },
		},
		description: 'Demonyms (what people from this country are called)',
		type: 'object',
		additionalProperties: {
			type: 'object',
			properties: {
				f: { type: 'string', description: 'Female form' },
				m: { type: 'string', description: 'Male form' },
			},
		},
	})
	demonyms!: Record<string, DemonymDto>;

	@ApiProperty({ example: 105845, description: 'Population' })
	population!: number;
}
