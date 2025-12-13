import { CountryResponseDto } from '@packages/utils/src/api/types.gen';

export default interface countryProps extends CountryResponseDto {
	language: 'ru' | 'en';
}
