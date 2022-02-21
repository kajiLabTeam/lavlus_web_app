import axios from 'axios';

export namespace LavlusApi {
  export const SERVER_URL = 'https://lavlus-api.ayaka.work';
  export const login = async (
    email: string | undefined,
    password: string | undefined,
  ) => {
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
