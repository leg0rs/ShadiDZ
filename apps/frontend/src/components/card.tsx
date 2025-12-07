const Card = ({ title, children }: { title: string; children: React.ReactNode }) => {
	return (
		<div className="bg-card p-6 rounded-xl shadow-custom-lg border border-border hover-lift">
			<h3 className="text-xl font-bold mb-4 text-primary">{title}</h3>
			<div className="space-y-2">{children}</div>
		</div>
	);
};

export default Card;
