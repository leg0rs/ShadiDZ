'use client';

import { Button } from '@legors/ui/src/components/ui/button';
import { Input } from '@legors/ui/src/components/ui/input';
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@legors/ui/src/components/ui/table';
import { CountryResponseDto } from '@legors/utils/src/api/types.gen';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Card from '@/components/CountryView/card';
import TableView from '@/components/CountryView/tableview';
import getLanguage from '@/utils/getlaguade';

import { getCountriesAction } from '../../actions';

const CountriesPage = () => {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();
	const pageParam = params.page as string;
	const currentPage = parseInt(pageParam) || 0;
	const searchQuery = searchParams.get('search') || '';

	const [countries, setCountries] = useState<CountryResponseDto[]>([]);
	const [search, setSearch] = useState<string>(searchQuery);
	const [language, setLanguage] = useState<string>('ru');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
	const [needForward, setNeedForward] = useState<boolean>(true);
	const [viewMode, setViewMode] = useState<'card' | 'list' | 'table'>('card');
	const [loadedPages, setLoadedPages] = useState<number>(1);

	const GetCountries = async (page: number, append: boolean = false) => {
		if (append) {
			setIsLoadingMore(true);
		} else {
			setIsLoading(true);
		}

		const countries = await getCountriesAction({
			start: 1 + page * 24,
			end: 24 + page * 24,
			search,
		});

		const Testcountries = await getCountriesAction({
			start: 1 + (page + 1) * 24,
			end: 24 + (page + 1) * 24,
			search,
		});

		console.log('Testcountries length:', Testcountries);
		setNeedForward((Testcountries?.length ?? 0) > 0);

		if (countries) {
			if (append) {
				setCountries((prev) => [...prev, ...countries]);
			} else {
				setCountries(countries);
				setLoadedPages(1);
			}
		}

		if (append) {
			setIsLoadingMore(false);
		} else {
			setIsLoading(false);
		}
	};

	const handleLoadMore = async () => {
		const nextPage = currentPage + loadedPages;
		await GetCountries(nextPage, true);
		setLoadedPages((prev) => prev + 1);
	};

	useEffect(() => {
		const init = async () => {
			const lang = await getLanguage();
			setLanguage(lang);
		};
		init();
	}, []);

	useEffect(() => {
		if (searchQuery !== search) {
			setSearch(searchQuery);
		}
	}, [searchQuery, search]);

	useEffect(() => {
		if (currentPage < 0 || currentPage > 10) {
			router.push('/countries');
			return;
		}
		GetCountries(currentPage);
	}, [currentPage, search, GetCountries, router]);

	return (
		<div className="w-full overflow-x-hidden">
			<div className="mx-2 sm:mx-4 mb-4">
				<div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-4">
					<Input
						type="text"
						placeholder="Введите название страны"
						value={search}
						onChange={(e) => {
							const newSearch = e.target.value;
							setSearch(newSearch);
							const url = newSearch
								? `/countries?search=${encodeURIComponent(newSearch)}`
								: '/countries';
							if (currentPage !== 0 || searchQuery !== newSearch) {
								router.push(url);
							}
						}}
					/>
					<Button
						variant="outline"
						onClick={() => {
							const modes: ('card' | 'list' | 'table')[] = ['card', 'list', 'table'];
							const currentIndex = modes.indexOf(viewMode);
							const nextIndex = (currentIndex + 1) % modes.length;
							setViewMode(modes[nextIndex]);
						}}
					>
						{viewMode === 'card'
							? '☰ Списком'
							: viewMode === 'list'
								? '⊞ Таблицей'
								: '⊞ Карточками'}
					</Button>
				</div>
				{isLoading ? (
					<div className="flex justify-center items-center min-h-[400px]">
						<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
					</div>
				) : countries.length === 0 ? (
					<div className="flex justify-center items-center min-h-[400px] text-muted-foreground">
						Нет стран, соответствующих вашему запросу.
					</div>
				) : viewMode === 'card' ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 min-h-[400px]">
						{countries.map((country) => (
							<Card key={country.cca2} {...country} language={language} />
						))}
					</div>
				) : (
					<div className="min-h-[400px] overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-left">Страна</TableHead>
									<TableHead className="text-left hidden sm:table-cell">Регион</TableHead>
									<TableHead className="text-left hidden md:table-cell">Столица</TableHead>
									<TableHead className="text-right hidden lg:table-cell">Население</TableHead>
									<TableHead className="text-right hidden xl:table-cell">Площадь км²</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{countries.map((country) => (
									<TableView key={country.cca2} {...country} language={language} />
								))}
							</TableBody>
						</Table>
					</div>
				)}
				{!isLoading && countries.length > 0 && (
					<div className="flex justify-center mt-4 gap-4 flex-wrap">
						{needForward && (
							<Button onClick={handleLoadMore} disabled={isLoadingMore}>
								{isLoadingMore ? (
									<>
										<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-foreground"></div>
										Загрузка...
									</>
								) : (
									'Прогрузить ещё'
								)}
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
export default CountriesPage;
