import Link from 'next/link';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t border-border bg-header shadow-custom-sm">
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-muted-foreground">
						© {currentYear} legors. Все права защищены.
					</p>
					<div className="flex gap-6">
						<Link
							href="https://шахофпобеда.рф"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Конфиденциальность
						</Link>
						<Link
							href="https://шахофпобеда.рф"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Условия использования
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
