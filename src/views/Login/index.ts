import Block from '../../utils/Block';
import template from './login.hbs';
import styles from './styles.module.pcss';
import { SinginForm } from './../../components/SinginForm/index';
import { MainLabel } from './../../components/MainLabel/index';
import { LinkLabel } from '../../components/LinkLabel';

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
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}