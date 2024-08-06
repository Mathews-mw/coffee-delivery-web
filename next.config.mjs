/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'img.freepik.com',
			},
			{
				protocol: 'https',
				hostname: 'onedrive.live.com',
			},
		],
	},
};

export default nextConfig;
