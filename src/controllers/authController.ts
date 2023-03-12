import { ChangeData, SigninData, SignupData } from '../contracts/auth';
import API from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import { AuthAPI } from '../api/AuthAPI';
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
      console.error(e);
    }
  }

  async fetchUser() {
    const user = await this.api.read();

    store.set('user', user);
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go(Routes.Messanger);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async changeDate(data: ChangeData) {
    try {
      console.log(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
