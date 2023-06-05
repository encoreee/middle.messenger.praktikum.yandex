/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
import Block from '../../utils/Block';
import template from './singinForm.hbs';
import styles from './styles.module.pcss';
import { SigninData } from '../../contracts/auth';
import AuthController from '../../controllers/authController';
import { SingupFormInput } from '../SingupFormInput';
import { SingupFormButton } from '../SingupFormButton';
import { HelperIds, InputIds } from '../../utils/ElementIds';
import ElementValidator from '../../utils/ElementValidator';
import { HelperLabel } from '../HelperLabel';

interface SinginFormProps {}

export class SinginForm extends Block<SinginFormProps> {
  constructor(props: SinginFormProps) {
    super({ ...props });
  }

  init() {
    this.children.loginInput = new SingupFormInput({
      id: InputIds.login,
      name: InputIds.login,
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

    this.children.button = new SingupFormButton({
      label: 'Войти',
      events: {
        click: (event) => {
          event.preventDefault();
          this.onSubmit();
        },
      },
      type: 'submit',
    });

    this.children.loginHelper = new HelperLabel({
      id: HelperIds.loginHelper,
      label:
        'От 3 до 20 символов, латиница, цифры, но не из них, без пробелов, без спец',
    });

    this.children.passwordHelper = new HelperLabel({
      id: HelperIds.passwordHelper,
      label:
        'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    });

    ElementValidator.checkButtonEnable(this);
  }

  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof SingupFormInput)
      .map((child) => [
        (child as SingupFormInput).getName(),
        (child as SingupFormInput).getValue(),
      ]);

    const data = Object.fromEntries(values);

    AuthController.signin(data as SigninData);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
