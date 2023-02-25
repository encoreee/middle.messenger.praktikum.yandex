import { SignupData } from '../../contracts/auth';
import AuthController from '../../controllers/authController';
import Block from '../../utils/Block';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import template from './changeDataForm.hbs';
import * as styles from './styles.module.pcss';
import ElementValidator from '../../utils/ElementValidator';

interface ChangeDataFormProps {}

const InputIds: {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  display_name: string;
} = {
  email: 'email',
  login: 'login',
  first_name: 'first_name',
  second_name: 'second_name',
  phone: 'phone',
  display_name: 'display_name',
};

export class ChangeDataForm extends Block<ChangeDataFormProps> {
  constructor(props: ChangeDataFormProps) {
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

    this.children.nameInput = new SingupFormInput({
      id: InputIds.first_name,
      name: InputIds.first_name,
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

    this.children.chatNameInput = new SingupFormInput({
      id: InputIds.display_name,
      name: InputIds.display_name,
      placeholder: 'Имя в чате',
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

    this.children.lastnameInput = new SingupFormInput({
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
    this.children.phoneInput = new SingupFormInput({
      id: InputIds.phone,
      name: InputIds.phone,
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
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          this.onSubmit();
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
      if (!ElementValidator.validateInputOnSubmit(element.element as HTMLInputElement, this)) {
        return;
      }
    });

    AuthController.signup(data as SignupData);
  }

  
  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
