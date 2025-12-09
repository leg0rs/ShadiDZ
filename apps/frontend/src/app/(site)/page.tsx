'use client';

import { CountryResponseDto } from '@packages/utils/src/api/types.gen';
import { useEffect, useState } from 'react';

import Card from '@/components/card';
import getLanguage from '@/utils/getlaguade';

import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { getCountriesAction } from '../actions';

type PageProps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const Page = () => {
	const [countries, setCountries] = useState<CountryResponseDto[]>([]);
	const [search, setSearch] = useState<string>('');
	const [language, setLanguage] = useState<string>('ru');
	const [pages, setPages] = useState<PageProps>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const GetCountries = async () => {
		setIsLoading(true);
		const countries = await getCountriesAction({
			start: 1 + pages * 24,
			end: 24 + pages * 24,
			search,
		});
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
		GetCountries();
	}, [pages, search]);
	return (
		<div className="mx-4 mb-4">
			<input
				type="text"
				placeholder="Ввдеите название страны"
				className="flex justify-self-end h-10 bg-card text-card-foreground rounded-lg p-2 m-4"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
			{isLoading ? (
				<div className="flex justify-center items-center min-h-[400px]">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{countries.map((country) => (
						<Card key={country.cca2} {...country} language={language}></Card>
					))}
				</div>
			)}
			<div className="flex justify-center mt-4 gap-10">
				{pages != 0 && (
					<button
						className="hover-lift cursor-pointer flex gap-2 m-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
						onClick={() => setPages((prev) => (prev - 1) as PageProps)}
					>
						<ArrowBigLeft />
						Назад
					</button>
				)}
				{pages != 10 && (
					<button
						className="hover-lift cursor-pointer flex gap-2 m-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
						onClick={() => setPages((prev) => (prev + 1) as PageProps)}
					>
						Вперед <ArrowBigRight />
					</button>
				)}
			</div>
		</div>
	);
};
export default Page;
