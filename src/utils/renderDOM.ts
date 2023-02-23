import { ChangeDataPage } from '../views/ChangeDataPage';
import { LoginPage } from '../views/Login';
import { RegistrationPage } from '../views/Registration';
import { ChatStartPage } from './../views/ChatStartPage';
import { UserDataPage } from './../views/UserDataPage';

const ROUTES = {
  login: LoginPage,
  registration : RegistrationPage,
  chatStartPage : ChatStartPage,
  userDataPage : UserDataPage,
  changeDataPage : ChangeDataPage,

};

export function renderDom(route: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const PageComponent = ROUTES[route];
  const page = new PageComponent();

  root.appendChild(page.element!);
  page.dispatchComponentDidMount();
}