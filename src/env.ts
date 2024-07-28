import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(['development', 'production']).default('development'),
		API_BASE_URL: z.string().url(),
		NEXTAUTH_URL: z.string().url(),
		NEXTAUTH_SECRET: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
	},

	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		API_BASE_URL: process.env.API_BASE_URL,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	},
});
