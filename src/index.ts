import { LoginPage } from './views/Login';
import Router from './utils/Router';
import AuthController from './controllers/authController';
import { RegistrationPage } from './views/Registration/index';
import { ChatStartPage } from './views/ChatStartPage/index';


export enum Routes {
  Index = '/',
  Register = '/registration',
  Messanger = '/messanger',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Messanger, ChatStartPage)


  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Messanger)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }

});
