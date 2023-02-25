import { SingupFormButton } from '../components/SingupFormButton';
import { SingupFormInput } from '../components/SingupFormInput';
import Block from './Block';
import { InputIds } from './InputIds';
import InputValidator from './InputValidator';

export class ElementValidator {
  constructor() {}

  validateInputOnSubmit(element: HTMLInputElement | null, block: Block) {
    if (element) {
      switch (element.id) {
        case InputIds.email: {
          return InputValidator.validateMail(element.value);
        }
        case InputIds.login: {
          return InputValidator.validateLogin(element.value);
        }
        case InputIds.second_name: {
          return InputValidator.validateName(element.value);
        }
        case InputIds.first_name: {
          return InputValidator.validateName(element.value);
        }
        case InputIds.password: {
          return InputValidator.validatePass(element.value);
        }
        case InputIds.repeatepassword: {
          const password = Object.values(block.children)
            .filter((child) => child instanceof SingupFormInput)
            .filter(
              (child) =>
                (child as SingupFormInput).getId() === InputIds.password
            )[0] as SingupFormInput;

          return element.value === password.getValue();
        }
      }
    }
  }

  validateInput(element: HTMLInputElement | null, block : Block) {
    if (element) {
      switch (element.id) {
        case InputIds.email: {
          const mailInput = Object.values(block.children)
            .filter((child) => child instanceof SingupFormInput)
            .filter(
              (child) => (child as SingupFormInput).getId() === InputIds.email
            )[0] as SingupFormInput;

          let match = InputValidator.validateMail(element.value);

          if (!match) {
            this.setError(element);
            mailInput.setValidate(false);
          } else {
            this.setIdle(element);
            mailInput.setValidate(true);
          }

          break;
        }
        case InputIds.login: {
          const loginInput = Object.values(block.children)
            .filter((child) => child instanceof SingupFormInput)
            .filter(
              (child) => (child as SingupFormInput).getId() === InputIds.login
            )[0] as SingupFormInput;

          let match = InputValidator.validateLogin(element.value);

          if (!match) {
            this.setError(element);
            loginInput.setValidate(false);
          } else {
            this.setIdle(element);
            loginInput.setValidate(true);
          }

          break;
        }
        case InputIds.second_name: {
          const lastname = Object.values(block.children)
            .filter((child) => child instanceof SingupFormInput)
            .filter(
              (child) =>
                (child as SingupFormInput).getId() === InputIds.second_name
            )[0] as SingupFormInput;

          let match = InputValidator.validateName(element.value);

          if (!match) {
            this.setError(element);
            lastname.setValidate(false);
          } else {
            this.setIdle(element);
            lastname.setValidate(true);
          }

          break;
        }
        case InputIds.first_name: {
          const name = Object.values(block.children)
            .filter((child) => child instanceof SingupFormInput)
            .filter(
              (child) => (child as SingupFormInput).getId() === InputIds.first_name
            )[0] as SingupFormInput;

          let match = InputValidator.validateName(element.value);

          if (!match) {
            this.setError(element);
            name.setValidate(false);
          } else {
            this.setIdle(element);
            name.setValidate(true);
          }

          break;
        }
        case InputIds.password: {
          const password = Object.values(block.children)
            .filter((child) => child instanceof SingupFormInput)
            .filter(
              (child) =>
                (child as SingupFormInput).getId() === InputIds.password
            )[0] as SingupFormInput;

          let match = InputValidator.validateName(element.value);

          if (!match) {
            this.setError(element);
            password.setValidate(false);
          } else {
            this.setIdle(element);
            password.setValidate(true);
          }

          break;
        }

        case InputIds.phone: {
          const phone = Object.values(block.children)
            .filter((child) => child instanceof SingupFormInput)
            .filter(
              (child) =>
                (child as SingupFormInput).getId() === InputIds.phone
            )[0] as SingupFormInput;

          let match = InputValidator.validatePhone(element.value);

          if (!match) {
            this.setError(element);
            phone.setValidate(false);
          } else {
            this.setIdle(element);
            phone.setValidate(true);
          }

          break;
        }

        case InputIds.repeatepassword: {
          const repeatepassword = Object.values(block.children)
            .filter((child) => child instanceof SingupFormInput)
            .filter(
              (child) =>
                (child as SingupFormInput).getId() === InputIds.repeatepassword
            )[0] as SingupFormInput;

          const password = Object.values(block.children)
            .filter((child) => child instanceof SingupFormInput)
            .filter(
              (child) =>
                (child as SingupFormInput).getId() === InputIds.password
            )[0] as SingupFormInput;

          let pass = password.getValue();

          let isNotEqual = element.value !== pass;

          if (isNotEqual) {
            this.setError(element);
            repeatepassword.setValidate(false);
          } else {
            this.setIdle(element);
            repeatepassword.setValidate(true);
          }
          break;
        }
      }
    }
  }

  onFocusValidate(element: EventTarget) {
    if (element instanceof HTMLInputElement) {
      switch (element.id) {
        case InputIds.email: {
          this.setIdle(element);
          break;
        }
        case InputIds.login: {
          this.setIdle(element);
          break;
        }
        case InputIds.second_name: {
          this.setIdle(element);
          break;
        }
        case InputIds.first_name: {
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

  checkButtonEnable(block : Block) {
    const invalidInputs = Object.values(block.children)
      .filter((child) => child instanceof SingupFormInput)
      .filter((child) => (child as SingupFormInput).getValidate() === false);

    const button = Object.values(block.children).filter(
      (child) => child instanceof SingupFormButton
    )[0] as SingupFormButton;

    if (invalidInputs.length > 0) {
      button.setDisable(true);
    } else {
      button.setDisable(false);
    }
  }

  onBlurValidate(element: EventTarget | HTMLInputElement, block : Block) {
    if (element instanceof HTMLInputElement) {
      this.validateInput(element , block);

      this.checkButtonEnable(block);
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
}

export default new ElementValidator();
