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
		<div className="container mx-auto p-8 space-y-8">
			<div className="space-y-6">
				<Requset text="hello" method="GET" />
				<div className="flex justify-center flex-col items-center mt-6">
					<button
						className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-custom-md hover:shadow-custom-lg transition-all hover:scale-105 active:scale-95 mb-6"
						onClick={() => getMessage()}
					>
						Получить сообщение
					</button>
					<div className="w-full max-w-2xl p-6 bg-card rounded-xl shadow-custom-lg border border-border">
						<p className="text-sm text-muted-foreground mb-2">Ответ сервера:</p>
						<p className="text-lg font-semibold">{message?.message || 'Нажмите на кнопку выше'}</p>
					</div>
				</div>
			</div>

			<div className="space-y-6 mt-12">
				<Requset text="Analyze" method="POST" />
				<div className="flex flex-col justify-center items-center">
					<button
						className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-custom-md hover:shadow-custom-lg transition-all hover:scale-105 active:scale-95 mb-6"
						onClick={() => getAnalyze()}
					>
						Запустить анализ
					</button>
					<div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="bg-card p-6 rounded-xl shadow-custom-lg border border-border hover-lift">
							<h3 className="text-xl font-bold mb-4 text-primary">Прогноз цены</h3>
							<div className="text-3xl font-bold text-primary">
								{analyzeData?.predicted_price ? `₽${analyzeData.predicted_price}` : '—'}
							</div>
						</div>
						<div className="bg-card p-6 rounded-xl shadow-custom-lg border border-border hover-lift">
							<h3 className="text-xl font-bold mb-4 text-primary">Статистика</h3>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Население:</span>
									<span className="font-semibold">{analyzeData?.stats.population || '—'}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Wildberries:</span>
									<span className="font-semibold">{analyzeData?.stats.count_wb || '—'}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Ozon:</span>
									<span className="font-semibold">{analyzeData?.stats.count_ozon || '—'}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Аптеки:</span>
									<span className="font-semibold">
										{analyzeData?.stats.count_pharmacies || '—'}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Метро:</span>
									<span className="font-semibold">{analyzeData?.stats.count_metro || '—'}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-sm text-muted-foreground">Магазины:</span>
									<span className="font-semibold">{analyzeData?.stats.count_shops || '—'}</span>
								</div>
							</div>
						</div>
						<div className="bg-card p-6 rounded-xl shadow-custom-lg border border-border hover-lift">
							<h3 className="text-xl font-bold mb-4 text-primary">Анализ маркетплейсов</h3>
							<div className="space-y-4">
								{analyzeData?.analyses.map((analysis) => (
									<div
										key={analysis.marketplace}
										className="p-4 bg-secondary/30 rounded-lg border border-border/50"
									>
										<div className="font-semibold mb-2">{analysis.marketplace}</div>
										<div className="space-y-1 text-sm">
											<div className="flex justify-between">
												<span className="text-muted-foreground">Можно открыть:</span>
												<span
													className={
														analysis.can_open
															? 'text-green-500 font-semibold'
															: 'text-red-500 font-semibold'
													}
												>
													{analysis.can_open ? 'Да' : 'Нет'}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Тарифов:</span>
												<span>{analysis.tariffs.length}</span>
											</div>
											{analysis.subsidy && (
												<>
													<div className="flex justify-between">
														<span className="text-muted-foreground">Субсидия:</span>
														<span>{analysis.subsidy.subsidy_type}</span>
													</div>
													<div className="flex justify-between">
														<span className="text-muted-foreground">Размер:</span>
														<span>{analysis.subsidy.subsidy_size}</span>
													</div>
												</>
											)}
										</div>
									</div>
								)) || <p className="text-muted-foreground text-sm">Нет данных</p>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
