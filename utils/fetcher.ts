import axios from 'axios';

axios.defaults.baseURL = 'https://lavlus-api.ayaka.work';

export const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const fetchWithToken = (url: string, token: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data);
