/* eslint-disable import/no-cycle */
import UserApi, { UserAPI } from '../api/UserAPI';
import { ChangeData, ChangePassData } from '../contracts/user';
import AuthApi, { AuthAPI } from '../api/AuthAPI';
import { storage } from '../utils/Store';
import router from '../utils/Router';
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

      storage.set('user', user);

      router.go(Routes.Profile);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async changePass(data: ChangePassData) {
    try {
      await this.userApi.changeUserPass(data);

      const user = await this.authApi.read();

      storage.set('user', user);

      router.go(Routes.Profile);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      await this.userApi.changeUserAvatar(data);

      const user = await this.authApi.read();

      storage.set('user', user);

      router.go(Routes.Profile);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new UserController();
