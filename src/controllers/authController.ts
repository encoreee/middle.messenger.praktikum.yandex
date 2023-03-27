/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-cycle */
import { SigninData, SignupData } from '../contracts/auth';
import API, { AuthAPI } from '../api/AuthAPI';
import router from '../utils/Router';
import { Routes } from '..';
import { Storage } from '../utils/Storage';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go(Routes.Messenger);
    } catch (e: any) {
      console.error(e);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      router.go(Routes.Index);
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    Storage.set('user', user);
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go(Routes.Messenger);
    } catch (e: any) {
      console.error(e);
    }
  }
}

export default new AuthController();
