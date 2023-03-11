import { ChangeData, SigninData, SignupData } from '../contracts/auth';

export class AuthController {
  constructor() {}

  async signin(data: SigninData) {
    try {
      console.log(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async signup(data: SignupData) {
    try {
      console.log(data);
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
