import { SignupData } from '../../contracts/auth';
import AuthController from '../../controllers/authController';
import Block from '../../utils/Block';
import { renderDom } from '../../utils/renderDOM';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import template from './singupForm.hbs';
import ElementValidator from '../../utils/ElementValidator';

import * as styles from './styles.module.pcss';
import { HelperIds, InputIds } from '../../utils/ElementIds';
import { HelperLabel } from './../HelperLabel/index';

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

    this.children.mailHelper = new HelperLabel({
      id: HelperIds.emailHepler,
      label: 'Латиница, цифры и спецсимволы , @ и точка после неё',
    });
    this.children.loginHelper = new HelperLabel({
      id: HelperIds.loginHelper,
      label: 'От 3 до 20 символов, латиница, цифры, но не из них, без пробелов, без спец',
    });
    this.children.nameHelper = new HelperLabel({
      id: HelperIds.first_nameHelper,
      label: 'Первая заглавная, без пробелов, без цифр, без спец',
    });
    this.children.lastNameHelper = new HelperLabel({
      id: HelperIds.second_nameHelper,
      label: 'Первая заглавная, без пробелов, без цифр, без спец',
    });
    this.children.phoneHelper = new HelperLabel({
      id: HelperIds.phoneHelper,
      label: 'От 10 до 15 символов, цифры.',
    });
    this.children.passwordHelper = new HelperLabel({
      id: HelperIds.passwordHelper,
      label: 'От 8 до 40 символов, одна заглавная буква и одна цифра',
    });
    this.children.repeatHelper = new HelperLabel({
      id: HelperIds.repeatepasswordHelper,
      label: 'Пароли должны совпадать',
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
