'use client';

import { client } from '@packages/utils/src/api/client.gen';
import { analyze, hello } from '@packages/utils/src/api/sdk.gen';
import type { AnalyzeResponse, HelloResponse } from '@packages/utils/src/api/types.gen';
import { useState } from 'react';

client.setConfig({
	// Устанавливаем базовый URL для запросов
	baseURL: 'http://localhost:8080/v0',
});

export default function Home() {
	// Интерфейсы автоматически генерируются из openapi.json
	const [message, setMessage] = useState<HelloResponse>();
	const [analyzeData, setAnalyzeData] = useState<AnalyzeResponse>();
	// Функция для получения данных о анализе
	const getAnalyze = async () => {
		const { data: response } = await analyze({
			query: {
				latitude: 55.76874,
				longitude: 37.588835,
				address: 'Москва, улица Гашека, 7с1',
				area: 25,
			},
		});
		console.log('Data: ', response);
		setAnalyzeData(response);
	};

	// Функция для получения данных о сообщении
	const getMessage = async () => {
		const { data: response } = await hello();
		console.log('No data', response);
		setMessage(response);
	};

	// Возвращаем компонент
	return (
		<>
			{/* Компонент для отображения данных о сообщении */}
			<div className="text-500 font-bold">
				<h1>Hello World</h1>
				<button
					className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
					onClick={() => getMessage()}
				>
					Click me
				</button>
				<div>{message?.message}</div>
			</div>

			{/* Компонент для отображения данных о анализе */}
			<div className="text-500 font-bold mt-30">
				<h1>Analyze</h1>
				<button
					className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
					onClick={() => getAnalyze()}
				>
					Click me
				</button>
				<div className="flex justify-betweens gap-10">
					<div>
						<div>Predicted price: {analyzeData?.predicted_price}</div>
					</div>
					<div>
						<div className="mb-2">Stats:</div>
						<div>Population: {analyzeData?.stats.population}</div>
						<div>Wb: {analyzeData?.stats.count_wb}</div>
						<div>Ozon: {analyzeData?.stats.count_ozon}</div>
						<div>Pharmacies: {analyzeData?.stats.count_pharmacies}</div>
						<div>Metro: {analyzeData?.stats.count_metro}</div>
						<div>Shops: {analyzeData?.stats.count_shops}</div>
						<div>Commercials: {analyzeData?.stats.count_commercials}</div>
						<div>Platforms: {analyzeData?.stats.count_platforms}</div>
					</div>
					<div>
						<div className="mb-2">Analyses:</div>
						<div className="flex gap-12">
							{analyzeData?.analyses.map((analysis) => (
								<div key={analysis.marketplace}>
									<div>Marketplace: {analysis.marketplace}</div>
									<div className="mt-2 mb-2">Can open: {analysis.can_open}</div>
									<div>Tariffs: {analysis.tariffs.length}</div>
									<div>Subsidy: {analysis.subsidy?.subsidy_type}</div>
									<div>Subsidy size: {analysis.subsidy?.subsidy_size}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
