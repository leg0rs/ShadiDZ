import { Test, TestingModule } from '@nestjs/testing';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountryResponseDto } from './dto/country-response.dto';

describe('CountriesController', () => {
	let countriesController: CountriesController;
	let countriesService: CountriesService;

	const mockCountries: CountryResponseDto[] = [
		{
			name: {
				common: 'Aruba',
				official: 'Aruba',
				native: {
					nld: { official: 'Aruba', common: 'Aruba' },
					pap: { official: 'Aruba', common: 'Aruba' },
				},
			},
			tld: ['.aw'],
			cca2: 'AW',
			ccn3: '533',
			cca3: 'ABW',
			cioc: 'ARU',
			independent: false,
			status: 'officially-assigned',
			unMember: false,
			unRegionalGroup: '',
			currencies: { AWG: { name: 'Aruban florin', symbol: 'ƒ' } },
			idd: { root: '+2', suffixes: ['97'] },
			capital: ['Oranjestad'],
			altSpellings: ['AW'],
			region: 'Americas',
			subregion: 'Caribbean',
			languages: { nld: 'Dutch', pap: 'Papiamento' },
			translations: {
				ara: { official: 'أروبا', common: 'أروبا' },
				bre: { official: 'Aruba', common: 'Aruba' },
				ces: { official: 'Aruba', common: 'Aruba' },
				deu: { official: 'Aruba', common: 'Aruba' },
				est: { official: 'Aruba', common: 'Aruba' },
				fin: { official: 'Aruba', common: 'Aruba' },
				fra: { official: 'Aruba', common: 'Aruba' },
				hrv: { official: 'Aruba', common: 'Aruba' },
				hun: { official: 'Aruba', common: 'Aruba' },
				ita: { official: 'Aruba', common: 'Aruba' },
				jpn: { official: 'アルバ', common: 'アルバ' },
				kor: { official: '아루바', common: '아루바' },
				nld: { official: 'Aruba', common: 'Aruba' },
				per: { official: 'آروبا', common: 'آروبا' },
				pol: { official: 'Aruba', common: 'Aruba' },
				por: { official: 'Aruba', common: 'Aruba' },
				rus: { official: 'Аруба', common: 'Аруба' },
				slk: { official: 'Aruba', common: 'Aruba' },
				spa: { official: 'Aruba', common: 'Aruba' },
				srp: { official: 'Aruba', common: 'Aruba' },
				swe: { official: 'Aruba', common: 'Aruba' },
				tur: { official: 'Aruba', common: 'Aruba' },
				urd: { official: 'اروبا', common: 'اروبا' },
				zho: { official: '阿鲁巴', common: '阿鲁巴' },
			},
			latlng: [12.5, -69.96666666],
			landlocked: false,
			borders: [],
			area: 180,
			flag: '🇦🇼',
			demonyms: {
				eng: { f: 'Aruban', m: 'Aruban' },
				fra: { f: 'Arubaise', m: 'Arubais' },
			},
			population: 105845,
		},
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CountriesController],
			providers: [
				{
					provide: CountriesService,
					useValue: {
						getCountries: jest.fn(),
					},
				},
			],
		}).compile();

		countriesController = module.get<CountriesController>(CountriesController);
		countriesService = module.get<CountriesService>(CountriesService);
	});

	describe('getCountries', () => {
		it('should return an array of countries', async () => {
			const expectedResult = [mockCountries[0]];
			const getCountriesSpy = jest
				.spyOn(countriesService, 'getCountries')
				.mockResolvedValue(expectedResult);

			const query = { start: 1, end: 1, search: '', sortBy: 'None' };
			const result = await countriesController.getCountries(query);

			expect(result).toEqual(expectedResult);
			expect(getCountriesSpy).toHaveBeenCalledWith(1, 1, '', 'None');
		});
	});
});
