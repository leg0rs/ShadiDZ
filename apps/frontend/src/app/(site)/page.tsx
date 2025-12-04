'use client';

import Requset from '@/components/request';
import { client } from '@packages/utils/src/api/client.gen';
import { analyze, hello } from '@packages/utils/src/api/sdk.gen';
import { AnalyzeResponse, HelloResponse } from '@packages/utils/src/api/types.gen';
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
			<div className="text-500 font-bold">
				<Requset text="hello" method="GET" />
				<div className="flex justify-center flex-col items-center mt-4">
					<button
						className="bg-blue-500 text-white p-2 rounded-md cursor-pointer mb-3"
						onClick={() => getMessage()}
					>
						Click me
					</button>
					<div className="flex justify-between gap-10 bg-secondary p-2 rounded-2xl border-4">
						message: {message?.message}
					</div>
				</div>
			</div>

			<div className="text-500 font-bold mt-10">
				<Requset text="Analyze" method="POST" />
				<div className="flex flex-col justify-center items-center">
					<button
						className="bg-blue-500 text-white p-2 rounded-md cursor-pointer mb-3"
						onClick={() => getAnalyze()}
					>
						Click me
					</button>
					<div className="flex justify-between gap-10 bg-secondary p-2 rounded-2xl border-4">
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
			</div>
		</>
	);
}
