import axios from 'axios';
import { User } from '../types';

interface Auth extends User {
  token: string;
}

export namespace LavlusApi {
  export const SERVER_URL = 'https://lavlus-api.ayaka.work';
  export const login = async (
    email: string | undefined,
    password: string | undefined,
  ): Promise<Auth | null> => {
    try {
      const { data } = await axios.post(`${LavlusApi.SERVER_URL}/users/login`, {
        email,
        password,
      });
      return data ? { ...data, name: data.username } : null;
    } catch {
      return null;
    }
  };
}
