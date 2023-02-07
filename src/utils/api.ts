import axios, { CancelToken } from 'axios';
import { User, NewProjectValues, RequesterInfo, Project } from '../types';
import { getFirebaseIdToken } from '@/utils';

const SERVER_URL = 'https://lavlus-api.ayaka.work';

export const fetcher = async (path: string) => {
  const token = await getFirebaseIdToken();
  if (token) {
    // ログイン済み
    const config = { headers: { Authorization: 'Bearer ' + token } };
    const { data } = await axios.get(SERVER_URL + path, config);
    return data;
  } else {
    // 未ログイン
    const { data } = await axios.get(SERVER_URL + path);
    return data;
  }
};

export namespace Lavlus {
  // 依頼者登録
  export const registerRequesterInfo = async (values: RequesterInfo): Promise<User> => {
    const token = await getFirebaseIdToken();
    const config = { headers: { Authorization: 'Bearer ' + token } };
    const { data } = await axios.patch<User>(`${SERVER_URL}/me/requesterInfo`, values, config);
    return data;
  };
  // プロジェクト作成
  export const createProject = async (values: NewProjectValues): Promise<Project> => {
    const token = await getFirebaseIdToken();
    const config = { headers: { Authorization: 'Bearer ' + token } };
    const { data } = await axios.post<Project>(`${SERVER_URL}/projects`, values, config);
    return data;
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
