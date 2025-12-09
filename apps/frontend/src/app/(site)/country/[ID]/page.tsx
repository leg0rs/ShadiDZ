const CountryPage = async ({ params }: { params: Promise<{ ID: string }> }) => {
	const { ID } = await params;
	return <div>{ID}</div>;
};

export default CountryPage;
