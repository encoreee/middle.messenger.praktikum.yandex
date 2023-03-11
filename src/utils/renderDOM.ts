import { ChangeDataPage } from '../views/ChangeDataPage';
import { LoginPage } from '../views/Login';
import { RegistrationPage } from '../views/Registration';
import { ChatStartPage } from './../views/ChatStartPage';
import { UserDataPage } from './../views/UserDataPage';
import store from '../utils/store'
import { ChangePassPage } from './../views/ChangePassPage/index';

const ROUTES = {
  login: LoginPage,
  registration: RegistrationPage,
  chatStartPage: ChatStartPage,
  userDataPage: UserDataPage,
  changeDataPage: ChangeDataPage,
  changePassPage: ChangePassPage,
};

export function renderDom(route: keyof typeof ROUTES) {

  // @ts-ignore
  let state = store.state as State;

  if (state) {
    if(state.curPage){
      state.curPage.dispatchComponentDidUnmount();
    }
  }

  const root = document.querySelector('#app')!;
  root.innerHTML = '';

  const PageComponent = ROUTES[route];
  const page = new PageComponent();

  root.appendChild(page.element!);
  page.dispatchComponentDidMount();
  state.curPage = page;
}
