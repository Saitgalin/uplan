import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store';
import { ElMessage } from 'element-plus';

export class Request {
  protected baseURL = "/api";
  protected service: AxiosInstance;
  protected axiosRequestConfig: AxiosRequestConfig = {};
  private static _instance: Request;
  protected authStore: any;

  private constructor() {
    this.setRequestConfig();
    this.service = axios.create(this.axiosRequestConfig);
    this.authStore = useAuthStore();
    this.setInterceptorsResponse();
    this.setInterceptorsRequest()
  }

  public static getInstance(): Request {
    if (!this._instance) {
      this._instance = new Request();
    }

    return this._instance;
  }

  protected setRequestConfig(): void {
    this.axiosRequestConfig = {
      baseURL: this.baseURL,

    };
  }

  protected setInterceptorsResponse(): void {
    this.service.interceptors.response.use((response) => {
      return response;
    }, (err) => {
      if (err.response.status === 401) {
        this.authStore.logout();
      }

      return Promise.reject(err);
    });
  }


  protected setInterceptorsRequest(): void {
    this.service.interceptors.request.use(
      (config: any) => {
        if (this.authStore.token) {
          config.headers['Authorization'] = `Bearer ${this.authStore.token}`;
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }


  public async post(url: string, data: any = {}) {
    try {
      const result = await this.service.post(url, data);
      return result.data;
    } catch (error: any) {
      ElMessage.error(error.response.data.message);
    }
  }


  public async get(url: string, params: any = {}) {
    try {
      const result = await this.service.get(url, params);
      return result.data
    } catch (error: any) {
      ElMessage.error(error.response.data.message);
    }
  }
}