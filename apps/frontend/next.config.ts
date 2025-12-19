import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	reactCompiler: true,
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
