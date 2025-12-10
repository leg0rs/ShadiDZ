'use client'; // Обязательно: это клиентский компонент

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// Типы для TS (если нужны, можно вынести)
type MapComponents = {
	YMap: any;
	YMapDefaultSchemeLayer: any;
	YMapDefaultFeaturesLayer: any;
	YMapMarker: any;
	// добавь другие компоненты, если используешь
};

export default function YandexMap() {
	const [mapComponents, setMapComponents] = useState<MapComponents | null>(null);

	useEffect(() => {
		// Эта функция запустится только в браузере
		const loadMap = async () => {
			try {
				// Ждем загрузки скрипта, если он еще не готов
				// @ts-ignore: ymaps3 нет в типах window по умолчанию
				const ymaps3 = window.ymaps3;

				if (!ymaps3) {
					console.error('Ymaps3 script not loaded');
					return;
				}

				// Ждем готовности API и загружаем модуль reactify
				await ymaps3.ready;
				const { reactify } = await ymaps3.import('@yandex/ymaps3-reactify');

				// Связываем reactify с текущей версией React
				const reactifyApi = reactify.bindTo(React, ReactDOM);

				// Генерируем компоненты
				const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
					reactifyApi.module(ymaps3);

				// Сохраняем их в стейт
				setMapComponents({ YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker });
			} catch (e) {
				console.error('Не удалось загрузить карты:', e);
			}
		};

		loadMap();
	}, []);

	// Пока компоненты не сгенерированы — показываем лоадер
	if (!mapComponents) {
		return (
			<div style={{ width: '100%', height: '400px', background: '#f0f0f0' }}>Загрузка карты...</div>
		);
	}

	// Деструктурируем компоненты для удобства
	const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = mapComponents;

	return (
		// Важно: Контейнеру нужен размер
		<div style={{ width: '60%', height: '400px' }}>
			<YMap location={{ center: [65, 33], zoom: 9 }}>
				<YMapDefaultSchemeLayer />
				<YMapDefaultFeaturesLayer />

				<YMapMarker coordinates={[65, 33]}>
					{/* Контейнер для SVG, чтобы удобно сдвигать */}
					<div
						style={{
							width: '40px',
							height: '40px',
							transform: 'translate(-50%, -100%)', // Центрируем острие
							cursor: 'pointer',
							filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))', // Добавим небольшую тень
						}}
					>
						{/* Сам SVG код */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
							style={{ width: '100%', height: '100%' }} // Растягиваем на родительский div
						>
							{/* Красная часть */}
							<path
								fill="#E31C1C"
								d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
							/>
							{/* Белая точка внутри */}
							<circle fill="white" cx="192" cy="192" r="90" />
						</svg>
					</div>
				</YMapMarker>
			</YMap>
		</div>
	);
}
