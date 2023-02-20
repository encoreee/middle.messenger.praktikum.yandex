import { LoginPage } from './views/Login/index';
//import Handlebars from 'handlebars';

//Handlebars.registerPartial();
window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')!;

  const loginPage = new LoginPage();

  root.innerHTML = loginPage.element?.outerHTML!;
});
