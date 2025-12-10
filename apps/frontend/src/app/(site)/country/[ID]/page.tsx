import { CountryResponseDto } from '@legors/utils/src/api/types.gen';

import { getCountryAction } from '@/app/actions';
import App from '@/components/YandexMap';

const CountryPage = async ({ params }: { params: Promise<{ ID: string }> }) => {
	const { ID } = await params;
	const data: CountryResponseDto | undefined = await getCountryAction(ID);
	return (
		<div>
			{data ? <div>{data.latlng}</div> : '123'}
			<App />
		</div>
	);
};

export default CountryPage;
