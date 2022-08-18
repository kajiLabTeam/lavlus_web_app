import axios, { CancelToken } from "axios";
import { User, NewProjectValues } from "../types";

interface Auth extends User {
  token: string;
}
const SERVER_URL = "https://lavlus-api.ayaka.work";

export const fetcher = async (url: string, token?: string) => {
  const config = token ? { headers: { Authorization: "Bearer " + token } } : {};
  const { data } = await axios.get(SERVER_URL + url, config);
  return data;
};

export namespace LavlusApi {
  export interface loginArgs {
    email: string;
    password: string;
  }
  export const login = async ({
    email,
    password,
  }: loginArgs): Promise<Auth | null> => {
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
  export interface createProjectArgs {
    values: NewProjectValues;
    token: string;
  }
  export const createProject = async ({
    values,
    token,
  }: createProjectArgs): Promise<any | null> => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/projects`, values, {
        headers: { Authorization: "Bearer " + token },
      });
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  export interface downloadSensingDataArgs {
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
  }: downloadSensingDataArgs): Promise<any | null> => {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/sensing-data/${id}/download`,
        {
          headers: { Authorization: "Bearer " + token },
          responseType: "blob",
          cancelToken: cancelToken,
          onDownloadProgress,
        }
      );
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
