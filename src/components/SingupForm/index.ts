import { SignupData } from '../../contracts/auth';
import  AuthController  from '../../controllers/authController';
import Block from '../../utils/Block';
import { renderDom } from '../../utils/renderDOM';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import template from './singupForm.hbs';
import * as styles from './styles.module.pcss';

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
        click: (event) => {



          event.preventDefault();
          this.onSubmit()
          renderDom('chatStartPage');
        }
      } 
    });
  }

  onSubmit() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof SingupFormInput)
      .map((child) => ([(child as SingupFormInput).getName(), (child as SingupFormInput).getValue()]))

    const data = Object.fromEntries(values);

    AuthController.signup(data as SignupData);
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
