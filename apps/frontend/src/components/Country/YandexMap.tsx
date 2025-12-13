'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type MapComponents = {
	YMap: any;
	YMapDefaultSchemeLayer: any;
	YMapDefaultFeaturesLayer: any;
	YMapMarker: any;
};

export default function YandexMap({ latlong }: { latlong: number[] }) {
	const [mapComponents, setMapComponents] = useState<MapComponents | null>(null);

	useEffect(() => {
		const loadMap = async () => {
			try {
				// @ts-ignore
				const ymaps3 = window.ymaps3;

				if (!ymaps3) {
					console.error('Ymaps3 script not loaded');
					return;
				}

				await ymaps3.ready;
				const { reactify } = await ymaps3.import('@yandex/ymaps3-reactify');

				const reactifyApi = reactify.bindTo(React, ReactDOM);
				const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
					reactifyApi.module(ymaps3);

				setMapComponents({ YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker });
			} catch (e) {
				console.error('Не удалось загрузить карты:', e);
			}
		};

		loadMap();
	}, []);

	// Пока компоненты не сгенерированы — показываем лоадер
	if (!mapComponents || !latlong) {
		return (
			<div style={{ width: '100%', height: '400px', background: '#f0f0f0' }}>Загрузка карты...</div>
		);
	}

	// Деструктурируем компоненты для удобства
	const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = mapComponents;

	return (
		// Важно: Контейнеру нужен размер
		<div className="w-[60%] h-[400px]">
			<YMap location={{ center: latlong, zoom: 9 }}>
				<YMapDefaultSchemeLayer />
				<YMapDefaultFeaturesLayer />

				<YMapMarker coordinates={latlong}>
					<div
						style={{
							width: '40px',
							height: '40px',
							transform: 'translate(-50%, -100%)',
							cursor: 'pointer',
							filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))',
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
							style={{ width: '100%', height: '100%' }}
						>
							<path
								fill="#E31C1C"
								d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
							/>
							<circle fill="white" cx="192" cy="192" r="90" />
						</svg>
					</div>
				</YMapMarker>
			</YMap>
		</div>
	);
}
