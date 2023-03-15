import Block from '../../utils/Block';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import template from './changePassForm.hbs';
import * as styles from './styles.module.pcss';
import ElementValidator from '../../utils/ElementValidator';
import { HelperIds, InputIds } from '../../utils/ElementIds';
import { HelperLabel } from '../HelperLabel';
import UserController from './../../controllers/userController';
import { ChangePassData } from '../../contracts/user';
import { withStore } from '../../utils/withStore';
import { User } from '../../contracts/auth';

interface ChangePassFormProps {
  user: User;
}

interface PasswordInputData {
  oldPassword: string;
  password: string;
  repeatepassword: string;
}

export class ChangePassFormBase extends Block<ChangePassFormProps> {
  constructor(props: ChangePassFormProps) {
    super({ ...props });
  }

  init() {
    this.children.oldPasswordInput = new SingupFormInput({
      id: InputIds.old_password,
      name: InputIds.old_password,
      placeholder: 'Старый пароль',
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
      name: InputIds.password,
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

    this.children.repeatepasswordInput = new SingupFormInput({
      id: InputIds.repeatepassword,
      name: InputIds.repeatepassword,
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

    this.children.oldPasswordHelper = new HelperLabel({
      id: HelperIds.oldPasswordHelper,
      label: 'От 8 до 40 символов, одна заглавная буква и одна цифра',
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
    const passData = data as PasswordInputData;
    UserController.changePass({
      oldPassword: passData.oldPassword,
      newPassword: passData.password,
    } as ChangePassData);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => {
  return {
    user: state.user || {},
  };
});

// @ts-ignore
export const ChangePassForm = withUser(ChangePassFormBase);
