import {DefaultUser} from 'next-auth';
import {DefaultJWT} from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: User | JWT;
    accessToken?: string | null;
  }

  interface User extends DefaultUser {
    id?: string | null;
    token?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string | null;
  }
}
