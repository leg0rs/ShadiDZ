const InfoSection = ({
	title,
	items,
}: {
	title: string;
	items: { label: string; value: string }[];
}) => (
	<div className="space-y-4">
		<h3 className="h-10 font-semibold text-base text-center border-b pb-2">{title}</h3>
		<div className="space-y-2">
			{items.map((item) => (
				<div key={item.label} className="flex justify-between border-b pb-1 border-border">
					<span className="font-medium text-[1.2rem]">{item.label}</span>
					<span className="font-medium text-[1.2rem]">{item.value}</span>
				</div>
			))}
		</div>
	</div>
);

// В компоненте:
export default InfoSection;
