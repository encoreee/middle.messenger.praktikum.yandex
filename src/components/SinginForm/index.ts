import Block from '../../utils/Block';
import { SinginFormButton } from '../SinginFormButton';
import { SinginFormInput } from '../SinginFormInput';
import template from './singinForm.hbs';
import * as styles from './styles.module.pcss';
import { SigninData } from './../../contracts/auth';
import AuthController from '../../controllers/authController';

interface SinginFormProps {}

export class SinginForm extends Block<SinginFormProps> {
  constructor(props: SinginFormProps) {
    super({ ...props });
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
      label: 'Войти',
      events: {
        click: (event) => {
          event.preventDefault();
          this.onSubmit();
        },
      },
    });
  }

  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof SinginFormInput)
      .map((child) => [
        (child as SinginFormInput).getName(),
        (child as SinginFormInput).getValue(),
      ]);

    const data = Object.fromEntries(values);

    AuthController.signin(data as SigninData);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
