import { SignupData } from '../../contracts/auth';
import AuthController from '../../controllers/authController';
import Block from '../../utils/Block';
import { renderDom } from '../../utils/renderDOM';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import template from './singupForm.hbs';
import ElementValidator from '../../utils/ElementValidator';

import * as styles from './styles.module.pcss';
import { InputIds } from '../../utils/InputIds';

interface SingupFormProps {}

export class SingupForm extends Block<SingupFormProps> {
  constructor(props: SingupFormProps) {
    super({ ...props });
  }

  init() {
    this.children.mailInput = new SingupFormInput({
      id: InputIds.email,
      name: 'email',
      placeholder: 'Почта',
      events: {
        blur: (event) => {
          if (event.target) {
            ElementValidator.onBlurValidate(event.target, this);
          }
        },
        focus: (event) => {
          if (event.target) {
            ElementValidator.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.loginInput = new SingupFormInput({
      id: InputIds.login,
      name: 'login',
      placeholder: 'Имя пользователя',
      events: {
        blur: (event) => {
          if (event.target) {
            ElementValidator.onBlurValidate(event.target, this);
          }
        },
        focus: (event) => {
          if (event.target) {
            ElementValidator.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.nameInput = new SingupFormInput({
      id: InputIds.first_name,
      name: 'first_name',
      placeholder: 'Имя',
      events: {
        blur: (event) => {
          if (event.target) {
            ElementValidator.onBlurValidate(event.target, this);
          }
        },
        focus: (event) => {
          if (event.target) {
            ElementValidator.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.lastNameInput = new SingupFormInput({
      id: InputIds.second_name,
      name: 'second_name',
      placeholder: 'Фамилия',
      events: {
        blur: (event) => {
          if (event.target) {
            ElementValidator.onBlurValidate(event.target, this);
          }
        },
        focus: (event) => {
          if (event.target) {
            ElementValidator.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.lastNameInput = new SingupFormInput({
      id: InputIds.second_name,
      name: 'second_name',
      placeholder: 'Фамилия',
      events: {
        blur: (event) => {
          if (event.target) {
            ElementValidator.onBlurValidate(event.target, this);
          }
        },
        focus: (event) => {
          if (event.target) {
            ElementValidator.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.passwordInput = new SingupFormInput({
      id: InputIds.password,
      name: 'password',
      placeholder: 'Пароль',
      events: {
        blur: (event) => {
          if (event.target) {
            ElementValidator.onBlurValidate(event.target, this);
          }
        },
        focus: (event) => {
          if (event.target) {
            ElementValidator.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.repeatPasswordInput = new SingupFormInput({
      id: InputIds.repeatepassword,
      name: 'repeatepassword',
      placeholder: 'Повторите пароль',
      events: {
        blur: (event) => {
          if (event.target) {
            ElementValidator.onBlurValidate(event.target, this);
          }
        },
        focus: (event) => {
          if (event.target) {
            ElementValidator.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.phoneInput = new SingupFormInput({
      id: InputIds.phone,
      name: 'phone',
      placeholder: 'Телефон',
      events: {
        blur: (event) => {
          if (event.target) {
            ElementValidator.onBlurValidate(event.target, this);
          }
        },
        focus: (event) => {
          if (event.target) {
            ElementValidator.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.button = new SingupFormButton({
      label: 'Войти',
      events: {
        click: (event) => {
          event.preventDefault();
          this.onSubmit();
          renderDom('chatStartPage');
        },
      },
    });

    ElementValidator.checkButtonEnable(this);
  }

  onSubmit() {
    const inputs = Object.values(this.children)
      .filter((child) => child instanceof SingupFormInput)
      .map((child) => child as SingupFormInput);

    const values = Object.values(this.children)
      .filter((child) => child instanceof SingupFormInput)
      .map((child) => [
        (child as SingupFormInput).getName(),
        (child as SingupFormInput).getValue(),
      ]);

    const data = Object.fromEntries(values);

    inputs.forEach((element) => {
      if (
        !ElementValidator.validateInputOnSubmit(
          element.element as HTMLInputElement,
          this
        )
      ) {
        return;
      }
    });

    AuthController.signup(data as SignupData);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
