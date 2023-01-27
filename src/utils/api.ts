import axios, { CancelToken } from 'axios';
import { User, NewProjectValues, RequesterInfo } from '../types';

interface Auth extends User {
  token: string;
}

const SERVER_URL = 'https://lavlus-api.ayaka.work';

export const fetcher = async (path: string, token?: string) => {
  const config = token ? { headers: { Authorization: 'Bearer ' + token } } : {};
  const { data } = await axios.get(SERVER_URL + path, config);
  return data;
};

export namespace LavlusApi {
  export interface LoginArgs {
    email: string;
    password: string;
  }
  export const login = async ({ email, password }: LoginArgs): Promise<Auth | null> => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/users/login`, {
        email,
        password,
      });
      return data ? { ...data, name: data.username } : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export interface RegisterRequesterInfoArgs {
    values: Omit<RequesterInfo, 'createdAt' | 'updatedAt'>;
    token: string;
  }
  export const registerRequesterInfo = async ({
    values,
    token,
  }: RegisterRequesterInfoArgs): Promise<User | null> => {
    try {
      const { data } = await axios.patch<User>(`${SERVER_URL}/me/requesterInfo`, values, {
        headers: { Authorization: 'Bearer ' + token },
      });
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export interface CreateProjectArgs {
    values: NewProjectValues;
    token: string;
  }
  export const createProject = async ({
    values,
    token,
  }: CreateProjectArgs): Promise<any | null> => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/projects`, values, {
        headers: { Authorization: 'Bearer ' + token },
      });
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export interface DownloadSensingDataArgs {
    id: string;
    token: string;
    cancelToken: CancelToken;
    onDownloadProgress: (progressEvent: any) => void;
  }
  export const downloadSensingDataById = async ({
    id,
    token,
    cancelToken,
    onDownloadProgress,
  }: DownloadSensingDataArgs): Promise<any | null> => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/sensing-data/${id}/download`, {
        headers: { Authorization: 'Bearer ' + token },
        responseType: 'blob',
        cancelToken: cancelToken,
        onDownloadProgress,
      });
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
