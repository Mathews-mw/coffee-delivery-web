import NextAuth from 'next-auth'
import JWT from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRoleType;
      is_active: boolean;
    }
  }

  interface User {
    name: string;
	  email: string;
	  role: UserRoleType;
	  is_active: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    email: string;
    sub: string;
    id: string;
    role: string;
    is_active: boolean;
    iat: number;
    exp: number;
    jti: string;
  }
}