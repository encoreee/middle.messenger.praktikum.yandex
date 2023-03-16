/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import { LoginPage } from './views/Login';
import Router from './utils/Router';
import AuthController from './controllers/authController';
import { RegistrationPage } from './views/Registration/index';
import { ChatPage } from './views/ChatPage/index';
import { UserDataPage } from './views/UserDataPage/index';
import { ChangeDataPage } from './views/ChangeDataPage/index';
import { ChangePassPage } from './views/ChangePassPage/index';

export enum Routes {
  Index = '/',
  Register = '/registration',
  Messanger = '/messanger',
  Profile = '/profile',
  ChangeData = '/changedata',
  ChangePass = '/changepass',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Messanger, ChatPage)
    .use(Routes.Profile, UserDataPage)
    .use(Routes.ChangeData, ChangeDataPage)
    .use(Routes.ChangePass, ChangePassPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
    default:
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Messanger);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
