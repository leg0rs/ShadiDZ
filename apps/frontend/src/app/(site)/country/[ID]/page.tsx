import { CountryResponseDto } from '@legors/utils/src/api/types.gen';

import { getCountryAction } from '@/app/actions';
import CountryInfo from '@/components/Country/CountryInfo';
import YandexMap from '@/components/Country/YandexMap';

const CountryPage = async ({ params }: { params: Promise<{ ID: string }> }) => {
	const { ID } = await params;
	const data: CountryResponseDto | undefined = await getCountryAction(ID);

	if (!data) {
		return <div>Страна не найдена</div>;
	}
	return (
		<div className="flex flex-col">
			<CountryInfo data={data} />
			<div className=" justify-items-center mb-10">
				<p className='text-2xl text-bold'>Страна на Карте</p>
				<YandexMap latlong={data.latlng.reverse()} />
			</div>
		</div>
	);
};

export default CountryPage;
