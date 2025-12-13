export const logger = {
	log: (message: string, ...optionalParams: any[]) => {
		console.log(`[LOG] ${message}`, ...optionalParams);
	},
	error: (message: string, error?: unknown) => {
		console.error(message, error);
	},
};
