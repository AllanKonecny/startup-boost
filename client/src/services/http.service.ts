import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import history from 'services/history.service';

class HttpService {
    private static _preConf = {
        baseURL: 'http://localhost',
        withCredentials: true,
    };

    public static get<T>(url: string, conf?: AxiosRequestConfig | undefined): Promise<AxiosResponse<T>> {
        return axios.get<T>(url, { ...HttpService._preConf, ...conf });
    }

    public static put<T>(url: string, data?: unknown, conf?: AxiosRequestConfig | undefined): Promise<AxiosResponse<T>> {
        return axios.put<T>(url, data, { ...HttpService._preConf, ...conf });
    }


    public static post<T>(url: string, data?: unknown, conf?: AxiosRequestConfig | undefined): Promise<AxiosResponse<T>> {
        return axios.post<T>(url, data, { ...HttpService._preConf, ...conf });
    }

    public initInterceptors(): void {
        axios.interceptors.response.use(undefined, (err) => {
            const error = err as AxiosError;
            if (error.response?.status === 401) {
                history.push('/login');
            }
            return Promise.reject(err);
        });
    }
}

export default HttpService;
