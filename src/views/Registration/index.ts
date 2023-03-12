import { MainLabel } from '../../components/MainLabel';
import { SingupForm } from '../../components/SingupForm';
import Block from '../../utils/Block';
import template from './registration.hbs';
import * as styles from './styles.module.pcss';

export class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.mainLabel = new MainLabel({
      label: 'Регистрация',
    });

    this.children.singupForm = new SingupForm({});
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
