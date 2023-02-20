import Block from '../../utils/Block';
import { SinginFormButton } from '../SinginFormButton';
import { SinginFormInput } from '../SinginFormInput';
import template from './singinForm.hbs';
import styles from './styles.module.pcss';

interface SinginFormProps {
}

export class SinginForm extends Block<SinginFormProps> {
  constructor(props: SinginFormProps) {
    super({...props });
  }

  init() {
    this.children.nameInput = new SinginFormInput({
      id: 'login',
      name: 'username',
      placeholder: 'Введите имя пользователя',
    });

    this.children.passwordInput = new SinginFormInput({
      id: 'password',
      name: 'password',
      placeholder: 'Введите пароль',
    });

    this.children.button = new SinginFormButton({
      label: 'Войти'
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
