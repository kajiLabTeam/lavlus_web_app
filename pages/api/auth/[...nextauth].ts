// This is an example of how to read a JSON Web Token from an API route
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials, req) {
        try {
          const {data} = await axios.post(
            'https://lavlus-api.ayaka.work/users/login',
            credentials,
          );
          return data ? {...data, name: data.username} : null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({token, user, account, profile, isNewUser}) {
      if (user) token.accessToken = user.token;
      return Promise.resolve(token);
    },

    session({session, token, user}) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.user.id = token.sub;
      }
      return Promise.resolve(session);
    },
  },
  secret: process.env.SECRET ?? 'secret',
});
