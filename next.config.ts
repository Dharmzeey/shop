import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				hostname: "shop-api.dharmzeey.com",
			},
			{
				hostname: "media.dharmzeey.com"
			}
		]
	},

};

export default nextConfig;