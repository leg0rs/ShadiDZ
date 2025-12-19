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

				{/* {!isLoaded && (
					<div className="absolute inset-0 flex items-center justify-center bg-[#fafafa] z-1000 pointer-events-none">
						<div className="flex flex-col items-center gap-3 text-gray-300 animate-pulse">
							<div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
							<span className="text-sm font-medium">Загрузка карты...</span>
						</div>
					</div>
				)} */}
			</div>
		</div>
	);
};

export default YandexMap;
