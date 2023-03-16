/* eslint-disable import/no-cycle */
import { SigninData, SignupData } from '../contracts/auth';
import API, { AuthAPI } from '../api/AuthAPI';
import storage from '../utils/Store';
import router from '../utils/Router';

import { Routes } from '..';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go(Routes.Messanger);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      router.go(Routes.Index);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    storage.set('user', user);
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go(Routes.Messanger);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new AuthController();
