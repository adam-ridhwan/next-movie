import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signIn } from '@/app/_actions/signIn';
import { env } from '@/app/_lib/env';

const { NEXTAUTH_SECRET } = env;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        const authenticated = await signIn({ email, password });
        if (!authenticated.success) throw new Error(authenticated.message);

        return authenticated.user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
