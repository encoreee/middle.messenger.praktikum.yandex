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
  Messenger = '/messenger',
  Profile = '/profile',
  ChangeData = '/changedata',
  ChangePass = '/changepass',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Messenger, ChatPage)
    .use(Routes.Profile, UserDataPage)
    .use(Routes.ChangeData, ChangeDataPage)
    .use(Routes.ChangePass, ChangePassPage);

  let isProtectedRoute = false;

  switch (window.location.pathname) {
    case Routes.Index:
      isProtectedRoute = true;
      break;
    case Routes.Messenger:
      isProtectedRoute = true;
      break;
    case Routes.Profile:
      isProtectedRoute = true;
      break;
    case Routes.ChangeData:
      isProtectedRoute = true;
      break;
    case Routes.ChangePass:
      isProtectedRoute = true;
      break;
    case Routes.Register:
      isProtectedRoute = true;
      break;
    default:
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (isProtectedRoute) {
      if (window.location.pathname === Routes.Index) {
        Router.go(Routes.Messenger);
      } else {
        Router.go(window.location.pathname);
      }
    } else {
      Router.go(Routes.Index);
    }
  } catch (e) {
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
