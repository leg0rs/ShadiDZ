'use client';

import Card from '@/components/card';
import Requset from '@/components/request';
import { AnalyzeResponse, HelloResponse } from '@packages/utils/src/api/types.gen';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shadcn/table';
import { useState } from 'react';
// Импортируем экшены
import { getAnalyzeAction, getHelloAction } from '../actions';

export default function Home() {
	const [message, setMessage] = useState<HelloResponse>();
	const [analyzeData, setAnalyzeData] = useState<AnalyzeResponse>();

	const getAnalyze = async () => {
		// Вызываем Server Action
		const response = await getAnalyzeAction();
		setAnalyzeData(response);
	};

	const getMessage = async () => {
		// Вызываем Server Action
		const response = await getHelloAction();
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

			<main className="space-y-6 mt-12">
				<Requset text="Analyze" method="POST" />
				<div className="flex flex-col justify-center items-center">
					<button
						className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-custom-md hover:shadow-custom-lg transition-all hover:scale-105 active:scale-95 mb-6"
						onClick={() => getAnalyze()}
					>
						Запустить анализ
					</button>
					<div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-7">
						<Card title="Прогноз цены">
							<div className="text-3xl font-bold text-primary">
								{analyzeData?.predicted_price ? `₽${analyzeData.predicted_price}` : '—'}
							</div>
						</Card>

						<Card title="Статистика">
							<Table>
								<TableHeader>
									<TableRow className="flex justify-between w-full">
										<TableHead className="w-1/2 border-r">Название</TableHead>
										<TableHead className="w-1/2 text-center">Значение</TableHead>
									</TableRow>
								</TableHeader>
								{[
									{ label: 'Население', value: analyzeData?.stats.population },
									{ label: 'Wildberries', value: analyzeData?.stats.count_wb },
									{ label: 'Ozon', value: analyzeData?.stats.count_ozon },
									{ label: 'Аптеки', value: analyzeData?.stats.count_pharmacies },
									{ label: 'Метро', value: analyzeData?.stats.count_metro },
									{ label: 'Магазины', value: analyzeData?.stats.count_shops },
								].map((item) => (
									<TableBody key={item.label}>
										<TableRow className="flex justify-between w-full">
											<TableCell className="w-1/2 border-r border-b">{item.label}</TableCell>
											<TableCell className="w-1/2 text-center border-b">{item.value}</TableCell>
										</TableRow>
									</TableBody>
								))}
							</Table>
						</Card>
						<Card title="Анализ маркетплейсов">
							{analyzeData?.analyses?.length ? (
								analyzeData.analyses.map(({ marketplace, can_open, tariffs, subsidy }) => (
									<div
										key={marketplace}
										className="p-4 bg-secondary/30 rounded-lg border border-border/50"
									>
										<div className="font-semibold mb-2">{marketplace}</div>
										<div className="space-y-1 text-sm">
											<div className="flex justify-between">
												<span className="text-muted-foreground">Можно открыть:</span>
												<span
													className={
														can_open ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'
													}
												>
													{can_open ? 'Да' : 'Нет'}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-muted-foreground">Тарифов:</span>
												<span>{tariffs.length}</span>
											</div>
											{subsidy && (
												<>
													<div className="flex justify-between">
														<span className="text-muted-foreground">Субсидия:</span>
														<span>{subsidy.subsidy_type}</span>
													</div>
													<div className="flex justify-between">
														<span className="text-muted-foreground">Размер:</span>
														<span>{subsidy.subsidy_size}</span>
													</div>
												</>
											)}
										</div>
									</div>
								))
							) : (
								<p className="text-muted-foreground text-sm">Нет данных</p>
							)}
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}
