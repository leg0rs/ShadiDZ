'use client';

import { CountryResponseDto } from '@packages/utils/src/api/types.gen';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Card from '@/components/card';
import getLanguage from '@/utils/getlaguade';

import { getCountriesAction } from '../../../actions';

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
	const [needForward, setNeedForward] = useState<boolean>(true);
	const [needBack, setNeedBack] = useState<boolean>(true);

	const GetCountries = async (page: number) => {
		setIsLoading(true);
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

		// Кнопка назад: показываем только если не на первой странице
		setNeedBack(page > 0);
		console.log('Testcountries length:', Testcountries);
		// Кнопка вперед: показываем только если есть результаты на следующей странице
		setNeedForward((Testcountries?.length ?? 0) > 0);

		if (countries) {
			setCountries(countries);
		}
		setIsLoading(false);
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
	}, [searchQuery]);

	useEffect(() => {
		if (currentPage < 0 || currentPage > 10) {
			router.push('/countries/0');
			return;
		}
		GetCountries(currentPage);
	}, [currentPage, search]);

	const handlePageChange = (newPage: number) => {
		const url = search
			? `/countries/${newPage}?search=${encodeURIComponent(search)}`
			: `/countries/${newPage}`;
		router.push(url);
	};

	return (
		<div className="w-full overflow-x-hidden">
			<div className="mx-4 mb-4">
				<input
					type="text"
					placeholder="Ввдеите название страны"
					className="flex justify-self-end w-100 h-10 bg-card text-card-foreground rounded-lg p-2 my-4"
					value={search}
					onChange={(e) => {
						const newSearch = e.target.value;
						setSearch(newSearch);
						const url = newSearch
							? `/countries/0?search=${encodeURIComponent(newSearch)}`
							: '/countries/0';
						if (currentPage !== 0 || searchQuery !== newSearch) {
							router.push(url);
						}
					}}
				/>
				{isLoading ? (
					<div className="flex justify-center items-center min-h-[400px]">
						<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
					</div>
				) : countries.length === 0 ? (
					<div className="flex justify-center items-center min-h-[400px] text-muted-foreground">
						Нет стран, соответствующих вашему запросу.
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[400px]">
						{countries.map((country) => (
							<Card key={country.cca2} {...country} language={language}></Card>
						))}
					</div>
				)}
				{!isLoading && (
					<div className="flex justify-center mt-4 gap-4 flex-wrap">
						{needBack && (
							<button
								className="hover-lift cursor-pointer flex gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
								onClick={() => handlePageChange(currentPage - 1)}
							>
								<ArrowBigLeft />
								Назад
							</button>
						)}
						{needForward && (
							<button
								className="hover-lift cursor-pointer flex gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
								onClick={() => handlePageChange(currentPage + 1)}
							>
								Вперед <ArrowBigRight />
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
export default CountriesPage;
