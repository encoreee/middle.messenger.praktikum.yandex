import UserApi from '../api/UserAPI';
import { UserAPI } from '../api/UserAPI';
import { ChangeData, ChangePassData } from '../contracts/user';
import AuthApi from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import { AuthAPI } from '../api/AuthAPI';
import { Routes } from '..';

export class UserController {
  private readonly userApi: UserAPI;
  private readonly authApi: AuthAPI;
  constructor() {
    this.userApi = UserApi;
    this.authApi = AuthApi;
  }

  async changeDate(data: ChangeData) {
    try {
      await this.userApi.changeUserData(data);

      const user = await this.authApi.read();

      store.set('user', user);

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async changePass(data: ChangePassData) {
    try {
      
      await this.userApi.changeUserPass(data);

      const user = await this.authApi.read();

      store.set('user', user);

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      await this.userApi.changeUserAvatar(data);

      const user = await this.authApi.read();

      store.set('user', user);

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e.message);
    }
  }



}

export default new UserController();