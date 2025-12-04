interface RequsetProps {
	method: 'GET' | 'POST';
	text: string;
}

const Requset = ({ method, text }: RequsetProps) => {
	return method === 'GET' ? (
		<div className="min-w-3/4 bg-blue-200 h-15 flex items-center pl-4 rounded-[8px] m-2 border-blue-300 border-3">
			<div className="text-white bg-blue-500 p-1 pl-4 pr-4 rounded-[8px]">GET</div>
			<div className="text-black ml-3 text-2xl">/{text}</div>
		</div>
	) : (
		<div className="min-w-3/4 bg-green-200 h-15 flex items-center pl-4 rounded-[8px] m-2 border-green-300 border-3">
			<div className="text-white bg-green-500 p-1 pl-4 pr-4 rounded-[8px]">POST</div>
			<div className="text-black ml-3 text-2xl">/{text}</div>
		</div>
	);
};

export default Requset;
