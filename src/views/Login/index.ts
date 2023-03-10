import Block from '../../utils/Block';
import template from './login.hbs';
import * as styles from './styles.module.pcss';
import { SinginForm } from './../../components/SinginForm/index';
import { MainLabel } from './../../components/MainLabel/index';
import { LinkLabel } from '../../components/LinkLabel';
import { renderDom } from '../../utils/renderDOM';

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.mainLabel = new MainLabel({
      label: 'ItemMessenger',
    });

    this.children.enterLabel = new MainLabel({
      label: 'Вход',
    });

    this.children.singinForm = new SinginForm({});

    this.children.linkLabel = new LinkLabel({
      label: 'Регистрация',
      events: {
        click: () => {
          //  renderDom('registration');
          renderDom('changeDataPage');
        },
      },
    });

    this.children.regLink = new LinkLabel({
      label: 'Регистрация',
      events: {
        click: () => {
          renderDom('registration');
        },
      },
    });

    this.children.chatLink = new LinkLabel({
      label: 'Страница чатов',
      events: {
        click: () => {
          renderDom('chatStartPage');
        },
      },
    });

    this.children.userDataLink = new LinkLabel({
      label: 'Данные пользователя',
      events: {
        click: () => {
          renderDom('userDataPage');
        },
      },
    });

    this.children.changeLink = new LinkLabel({
      label: 'Изменение данных',
      events: {
        click: () => {
          renderDom('changeDataPage');
        },
      },
    });

    this.children.changePassLink = new LinkLabel({
      label: 'Изменение пароля',
      events: {
        click: () => {
          renderDom('changePassPage');
        },
      },
    });

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
