import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LavlusApi } from '../../../utils';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const data = await LavlusApi.login(
          credentials?.email,
          credentials?.password,
        );
        return data;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account, profile, isNewUser }) {
      if (user) token.accessToken = user.token;
      return Promise.resolve(token);
    },

    session({ session, token, user }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.user.id = token.sub;
      }
      return Promise.resolve(session);
    },
  },
  secret: process.env.SECRET ?? 'secret',
});
