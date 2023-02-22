import { SignupData } from '../../contracts/auth';
import AuthController from '../../controllers/authController';
import Block from '../../utils/Block';
import { renderDom } from '../../utils/renderDOM';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import template from './singupForm.hbs';
import * as styles from './styles.module.pcss';

interface SingupFormProps {}

const InputIds: {
  mail: string;
  login: string;
  name: string;
  lastname: string;
  password: string;
  repeatepassword: string;
} = {
  mail: 'mail',
  login: 'login',
  name: 'name',
  lastname: 'lastname',
  password: 'password',
  repeatepassword: 'repeatepassword',
};

export class SingupForm extends Block<SingupFormProps> {
  constructor(props: SingupFormProps) {
    super({ ...props });
  }

  init() {
    this.children.mailInput = new SingupFormInput({
      id: InputIds.mail,
      name: 'mail',
      placeholder: 'Почта',
      events: {
        blur: (event) => {
          if (event.target) {
            this.onBlurValidate(event.target);
          }
        },
        focus: (event) => {
          if (event.target) {
            this.onFocusValidate(event.target);
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
            this.onBlurValidate(event.target);
          }
        },
        focus: (event) => {
          if (event.target) {
            this.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.nameInput = new SingupFormInput({
      id: InputIds.name,
      name: 'name',
      placeholder: 'Имя',
      events: {
        blur: (event) => {
          if (event.target) {
            this.onBlurValidate(event.target);
          }
        },
        focus: (event) => {
          if (event.target) {
            this.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.lastNameInput = new SingupFormInput({
      id: InputIds.lastname,
      name: 'lastname',
      placeholder: 'Фамилия',
      events: {
        blur: (event) => {
          if (event.target) {
            this.onBlurValidate(event.target);
          }
        },
        focus: (event) => {
          if (event.target) {
            this.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.repeatPasswordInput = new SingupFormInput({
      id: InputIds.password,
      name: 'password',
      placeholder: 'Пароль',
      events: {
        blur: (event) => {
          if (event.target) {
            this.onBlurValidate(event.target);
          }
        },
        focus: (event) => {
          if (event.target) {
            this.onFocusValidate(event.target);
          }
        },
      },
    });

    this.children.passwordInput = new SingupFormInput({
      id: InputIds.repeatepassword,
      name: 'repeatepassword',
      placeholder: 'Повторите пароль',
      events: {
        blur: (event) => {
          if (event.target) {
            this.onBlurValidate(event.target);
          }
        },
        focus: (event) => {
          if (event.target) {
            this.onFocusValidate(event.target);
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

    this.checkButtonEnable();
  }

  onSubmit() {
    const values = Object.values(this.children)
      .filter((child) => child instanceof SingupFormInput)
      .map((child) => [
        (child as SingupFormInput).getName(),
        (child as SingupFormInput).getValue(),
      ]);

    const data = Object.fromEntries(values);

    AuthController.signup(data as SignupData);
  }

  checkButtonEnable() {
    const invalidInputs = Object.values(this.children)
      .filter((child) => child instanceof SingupFormInput)
      .filter((child) => (child as SingupFormInput).getValidate() === false);

    const button = Object.values(this.children).filter(
      (child) => child instanceof SingupFormButton
    )[0] as SingupFormButton;

    if (invalidInputs.length > 0) {
      button.setDisable(true);
    } else {
      button.setDisable(false);
    }
  }

  onBlurValidate(element: EventTarget) {
    if (element instanceof HTMLInputElement) {
      switch (element.id) {
        case InputIds.mail: {
        
          const mailInput = Object.values(this.children)
          .filter((child) => child instanceof SingupFormInput)
          .filter((child) => (child as SingupFormInput).getId() === InputIds.mail)[0] as SingupFormInput;

          let caseMatch = element.value.match(/^[^A-Z^А-Я]/);
          let lettersMatch = element.value.match(/.[^a-z^а-я^ё^-]/);

          if (caseMatch || lettersMatch) {
            this.setError(element);
            mailInput.setValidate(false);


          } else {
            this.setIdle(element);
            mailInput.setValidate(true);
            
          }

          break;
        }
        case InputIds.login: {
          
          const loginInput = Object.values(this.children)
          .filter((child) => child instanceof SingupFormInput)
          .filter((child) => (child as SingupFormInput).getId() === InputIds.login)[0] as SingupFormInput;

          let caseMatch = element.value.match(/^[^A-Z^А-Я]/);
          let lettersMatch = element.value.match(/.[^a-z^а-я^ё^-]/);

          if (caseMatch || lettersMatch) {
            this.setError(element);
            loginInput.setValidate(false);
          } else {
            this.setIdle(element);
            loginInput.setValidate(true);
          }

          break;
        }
        case InputIds.lastname: {
          
          const lastname = Object.values(this.children)
          .filter((child) => child instanceof SingupFormInput)
          .filter((child) => (child as SingupFormInput).getId() === InputIds.lastname)[0] as SingupFormInput;

          let caseMatch = element.value.match(/^[^A-Z^А-Я]/);
          let lettersMatch = element.value.match(/.[^a-z^а-я^ё^-]/);

          if (caseMatch || lettersMatch) {
            this.setError(element);
            lastname.setValidate(false);
          } else {
            this.setIdle(element);
            lastname.setValidate(true);
          }

          break;
        }
        case InputIds.name: {
        
          const name = Object.values(this.children)
          .filter((child) => child instanceof SingupFormInput)
          .filter((child) => (child as SingupFormInput).getId() === InputIds.name)[0] as SingupFormInput;

          let caseMatch = element.value.match(/^[^A-Z^А-Я]/);
          let lettersMatch = element.value.match(/.[^a-z^а-я^ё^-]/);

          if (caseMatch || lettersMatch) {
            this.setError(element);
            name.setValidate(false);
          } else {
            this.setIdle(element);
            name.setValidate(true);
          }

          break;
        }
        case InputIds.password: {
          
          const password = Object.values(this.children)
          .filter((child) => child instanceof SingupFormInput)
          .filter((child) => (child as SingupFormInput).getId() === InputIds.password)[0] as SingupFormInput;

          let caseMatch = element.value.match(/^[^A-Z^А-Я]/);
          let lettersMatch = element.value.match(/.[^a-z^а-я^ё^-]/);

          if (caseMatch || lettersMatch) {
            this.setError(element);
            password.setValidate(false);
          } else {
            this.setIdle(element);
            password.setValidate(true);
          }

          break;
        }
        case InputIds.repeatepassword: {
        
          const repeatepassword = Object.values(this.children)
          .filter((child) => child instanceof SingupFormInput)
          .filter((child) => (child as SingupFormInput).getId() === InputIds.repeatepassword)[0] as SingupFormInput;

          let caseMatch = element.value.match(/^[^A-Z^А-Я]/);
          let lettersMatch = element.value.match(/.[^a-z^а-я^ё^-]/);

          if (caseMatch || lettersMatch) {
            this.setError(element);
            repeatepassword.setValidate(false);
          } else {
            this.setIdle(element);
            repeatepassword.setValidate(true);
          }

          break;
        }

        default: {
          //statements;
          break;
        }
      }

      this.checkButtonEnable();
    }
  }

  onFocusValidate(element: EventTarget) {
    if (element instanceof HTMLInputElement) {
      switch (element.id) {
        case InputIds.mail: {
          this.setIdle(element);
          break;
        }
        case InputIds.login: {
          this.setIdle(element);
          break;
        }
        case InputIds.lastname: {
          this.setIdle(element);
          break;
        }
        case InputIds.name: {
          this.setIdle(element);
          break;
        }
        case InputIds.password: {
          this.setIdle(element);
          break;
        }
        case InputIds.repeatepassword: {
          this.setIdle(element);
          break;
        }

        default: {
          //statements;
          break;
        }
      }
    }
  }

  setError(element: EventTarget) {
    if (element instanceof HTMLElement) {
      element.style.backgroundColor = 'LightPink';
      element.style.opacity = '0.6';
    }
  }

  setIdle(element: EventTarget) {
    if (element instanceof HTMLElement) {
      element.style.backgroundColor = 'white';
      element.style.opacity = '1';
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
