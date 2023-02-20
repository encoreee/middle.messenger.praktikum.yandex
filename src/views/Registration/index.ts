import Block from '../../utils/Block';
import template from './login.hbs';

import styles from './styles.module.pcss';


export class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  init() {
   
  }

  onSubmit() {

  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
