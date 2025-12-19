'use client';

import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import ymaps from 'yandex-maps';

interface YandexMapProps {
	latlong?: [number, number];
}

export type YMapsApi = typeof ymaps;

const YandexMap = ({ latlong }: YandexMapProps) => {
	return (
		<div className="w-full flex flex-col gap-4 font-sans items-center">
			{/* Контейнер карты */}
			<div className="w-3/4 h-[500px] rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-[#fafafa]">
				<YMaps
					query={{
						lang: 'ru_RU',
						load: 'package.full',
					}}
				>
					<Map
						defaultState={{
							center: latlong?.reverse(),
							zoom: 7,
							controls: [],
						}}
						className="w-full h-full"
						modules={['geocode']}
					>
						{latlong && (
							<Placemark
								geometry={latlong}
								options={{
									preset: 'islands#redDotIcon',
								}}
							/>
						)}
					</Map>
				</YMaps>
			</div>
		</div>
	);
};

export default YandexMap;
