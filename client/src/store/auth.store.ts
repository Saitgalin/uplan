import { defineStore } from 'pinia';

import router from '../routes';
import { Request } from '../api/Request';

export type AuthStore = {
  id: string;
  state: () => void;
}
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('token')
  }),
  actions: {
    async login(username: string, password: string) {
      const response = await Request.getInstance().post(`auth/login`, { username, password });

      if (!response) {
        return
      }
      const token = response.accessToken
      this.token = token;

      localStorage.setItem('token', token);
      await router.push('/createPlan')
    },
    async logout() {
      localStorage.removeItem('token');
      this.token = null;

      await router.push('/');
    }
  }
});