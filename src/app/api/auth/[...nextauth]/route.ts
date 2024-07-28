import { env } from '@/env';
import { cookies } from 'next/headers';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface ISessionResponse {
	user: {
		id: string;
		name: string;
		email: string;
		role: string;
		is_active: boolean;
	};
	token: string;
}

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials', // nome do provedor que será utilizado
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, req) {
				const res = await fetch(`${env.API_BASE_URL}/api/auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
					cache: 'no-cache',
				});

				const data = (await res.json()) as ISessionResponse;

				if (data && res.status === 200) {
					cookies().set('@coffeedelivery:refreshToken', data.token, {
						maxAge: 7 * 86400, // 7 days
						path: '/',
						domain: process.env.HOST ?? 'localhost',
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production',
					});

					return data.user;
				}

				return null;
			},
		}),
	],
	secret: `${env.NEXTAUTH_SECRET}`,
	pages: {
		signIn: '/sign-in',
	},
	callbacks: {
		async jwt({ token, trigger, user, session }) {
			return { ...token, ...user };
		},
		async session({ session, token, newSession, user, trigger }) {
			session.user.id = token.id;
			session.user.name = token.email;
			session.user.email = token.email;
			session.user.role = token.role;
			session.user.is_active = token.is_active;

			return session;
		},
	},
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
