import { ChangeData, ChangePassData } from '../contracts/user';
import BaseAPI from './BaseAPI';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeUserData(data: ChangeData) {
    return this.http.put('/profile', data);
  }

  changeUserAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  changeUserPass(data: ChangePassData) {
    return this.http.put('/password', data);
  }

  read = undefined;

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new UserAPI();
