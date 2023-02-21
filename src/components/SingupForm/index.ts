import Block from '../../utils/Block';
import { renderDom } from '../../utils/renderDOM';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import template from './singupForm.hbs';
import styles from './styles.module.pcss';

interface SingupFormProps {
}

export class SingupForm extends Block<SingupFormProps> {
  constructor(props: SingupFormProps) {
    super({...props });
  }

  init() {
    this.children.mailInput = new SingupFormInput({
      id: 'mail',
      name: 'mail',
      placeholder: 'Почта',
    });

    this.children.loginInput = new SingupFormInput({
      id: 'login',
      name: 'login',
      placeholder: 'Имя пользователя',
    });

    this.children.nameInput = new SingupFormInput({
      id: 'name',
      name: 'name',
      placeholder: 'Имя',
    });

    this.children.lastNameInput = new SingupFormInput({
      id: 'lastname',
      name: 'lastname',
      placeholder: 'Фамилия',
    });

    this.children.repeatPasswordInput = new SingupFormInput({
      id: 'password',
      name: 'password',
      placeholder: 'Пароль',
    });

    this.children.passwordInput = new SingupFormInput({
      id: 'repeatepassword',
      name: 'repeatepassword',
      placeholder: 'Повторите пароль',
    });

    this.children.button = new SingupFormButton({
      label: 'Войти',
      events : {
        click: () => {
          renderDom('chatStartPage');
        }
      } 
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
