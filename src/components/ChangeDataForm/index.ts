/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import Block from '../../utils/Block';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import template from './changeDataForm.hbs';
import styles from './styles.module.pcss';
import ElementValidator from '../../utils/ElementValidator';
import { HelperIds, InputIds } from '../../utils/ElementIds';
import { HelperLabel } from '../HelperLabel';
import UserController from '../../controllers/userController';
import { ChangeData } from '../../contracts/user';
import { User } from '../../contracts/auth';
import InputValidator from '../../utils/InputValidator';

interface ChangeDataFormProps {
  user: User;
}

export class ChangeDataForm extends Block<ChangeDataFormProps> {
  constructor(props: ChangeDataFormProps) {
    super({ ...props });
  }

  init() {
    const mailInput = new SingupFormInput({
      id: InputIds.email,
      name: 'email',
      placeholder: 'Почта',
      value: this.props.user.email,
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
    if (InputValidator.validateMail(this.props.user.email)) {
      mailInput.setValidate(true);
    }
    this.children.mailInput = mailInput;

    const loginInput = new SingupFormInput({
      id: InputIds.login,
      name: InputIds.login,
      placeholder: 'Имя пользователя',
      value: this.props.user.login,
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

    if (InputValidator.validateLogin(this.props.user.login)) {
      loginInput.setValidate(true);
    }
    this.children.loginInput = loginInput;

    const nameInput = new SingupFormInput({
      id: InputIds.first_name,
      name: InputIds.first_name,
      placeholder: 'Имя',
      value: this.props.user.first_name,
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

    if (InputValidator.validateName(this.props.user.first_name)) {
      nameInput.setValidate(true);
    }
    this.children.nameInput = nameInput;

    const chatNameInput = new SingupFormInput({
      id: InputIds.display_name,
      name: InputIds.display_name,
      placeholder: 'Имя в чате',
      value: this.props.user.display_name,
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

    if (InputValidator.validateName(this.props.user.display_name)) {
      chatNameInput.setValidate(true);
    }
    this.children.chatNameInput = chatNameInput;

    const lastNameInput = new SingupFormInput({
      id: InputIds.second_name,
      name: 'second_name',
      placeholder: 'Фамилия',
      value: this.props.user.second_name,
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
    if (InputValidator.validateName(this.props.user.second_name)) {
      lastNameInput.setValidate(true);
    }
    this.children.lastNameInput = lastNameInput;

    const phoneInput = new SingupFormInput({
      id: InputIds.phone,
      name: InputIds.phone,
      placeholder: 'Телефон',
      value: this.props.user.phone,
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
    if (InputValidator.validatePhone(this.props.user.phone)) {
      phoneInput.setValidate(true);
    }
    this.children.phoneInput = phoneInput;

    this.children.button = new SingupFormButton({
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          this.onSubmit();
        },
      },
      type: 'submit',
    });
    this.children.mailHelper = new HelperLabel({
      id: HelperIds.emailHepler,
      label: 'Латиница, цифры и спецсимволы , @ и точка после неё',
    });
    this.children.loginHelper = new HelperLabel({
      id: HelperIds.loginHelper,
      label:
        'От 3 до 20 символов, латиница, цифры, но не из них, без пробелов, без спец',
    });
    this.children.nameHelper = new HelperLabel({
      id: HelperIds.first_nameHelper,
      label: 'Первая заглавная, без пробелов, без цифр, без спец',
    });
    this.children.chatNameHelper = new HelperLabel({
      id: HelperIds.display_nameHelper,
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

    ElementValidator.checkButtonEnable(this);
  }

  protected componentDidUpdate(): boolean {
    ElementValidator.checkButtonEnable(this);
    return true;
  }

  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof SingupFormInput)
      .map((child) => [
        (child as SingupFormInput).getName(),
        (child as SingupFormInput).getValue(),
      ]);

    const data = Object.fromEntries(values);

    UserController.changeDate(data as ChangeData);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
