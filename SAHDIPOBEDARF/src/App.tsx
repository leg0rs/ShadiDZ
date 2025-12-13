import './App.css';
import Achivments from './components/Achivments';
import Footer from './components/Footer';
import Guide from './components/Guide';
import Header from './components/Header';
import Main from './components/Main';
import Reviews from './components/Reviews';
import SkillsAndComparison from './components/SkillsAndComparison';

function App() {
	return (
		<div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth">
			<Header />
			<div className="relative flex h-screen w-full snap-start items-center justify-center bg-gray-800">
				<Main />
			</div>
			<div className="relative flex h-screen w-full snap-start items-center justify-center bg-gray-800">
				<Achivments />
			</div>
			<div className="relative flex min-h-screen w-full snap-start items-center justify-center bg-gray-800">
				<Guide />
			</div>
			<div className="relative flex min-h-screen w-full snap-start items-center justify-center bg-gray-800">
				<SkillsAndComparison />
			</div>
			<div className="relative flex min-h-screen w-full snap-start flex-col items-center justify-between bg-gray-800">
				<Reviews />
				<Footer />
			</div>
		</div>
	);
}

export default App;
