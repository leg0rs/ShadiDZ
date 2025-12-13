import { TableCell, TableRow } from '@legors/ui/src/components/ui/table';
import { redirect } from 'next/navigation';

import countryProps from '@/types/countryProps';

const TableView = (props: countryProps) => {
	const { language } = props;
	let cardText: string | undefined = undefined;
	if (language === 'ru') {
		cardText = props.translations.rus.common;
	} else {
		cardText = props.name.common;
	}
	if (!cardText) {
		cardText = '—';
	}

	return (
		<TableRow
			className="cursor-pointer"
			onClick={() => {
				redirect(`/country/${props.cca2}`);
			}}
		>
			<TableCell className="font-bold text-sm md:text-lg">
				{props.flag} {cardText}
			</TableCell>
			<TableCell className="hidden sm:table-cell">{props.region ?? '—'}</TableCell>
			<TableCell className="hidden md:table-cell">{props.capital?.[0] ?? '—'}</TableCell>
			<TableCell className="text-right hidden lg:table-cell">
				{props.population?.toLocaleString() ?? '—'}
			</TableCell>
			<TableCell className="text-right hidden xl:table-cell">
				{props.area?.toLocaleString() ?? '—'}
			</TableCell>
		</TableRow>
	);
};

export default TableView;
