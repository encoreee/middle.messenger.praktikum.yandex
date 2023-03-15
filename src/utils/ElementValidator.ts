import { SingupFormButton } from '../components/SingupFormButton';
import { SingupFormInput } from '../components/SingupFormInput';
import Block from './Block';
import { HelperIds, InputIds } from './ElementIds';
import InputValidator from './InputValidator';
import { HelperLabel } from './../components/HelperLabel/index';

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
        case InputIds.display_name: {
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

  sanitaize(str: string) {
    return str.replace(/[^\w. ]/gi, function (c) {
      return '&#' + c.charCodeAt(0) + ';';
    });
  }

  validateInput(element: HTMLInputElement | null, block: Block) {
    if (element) {
      const input = this.findInputById(block, element.id);

      let str = this.sanitaize(element.value);

      switch (element.id) {
        case InputIds.email: {
          const mailHelper = this.findHelperById(block, HelperIds.emailHepler);
          let match = InputValidator.validateMail(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            mailHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            mailHelper.hide();
          }

          break;
        }
        case InputIds.login: {
          const loginHelper = this.findHelperById(block, HelperIds.loginHelper);
          let match = InputValidator.validateLogin(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            loginHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            loginHelper.hide();
          }

          break;
        }
        case InputIds.second_name: {
          const second_nameHelper = this.findHelperById(block, HelperIds.second_nameHelper);
          let match = InputValidator.validateName(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            second_nameHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            second_nameHelper.hide();
          }

          break;
        }
        case InputIds.first_name: {
          const first_nameHelper = this.findHelperById(block, HelperIds.first_nameHelper);
          let match = InputValidator.validateName(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            first_nameHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            first_nameHelper.hide();
          }

          break;
        }

        case InputIds.display_name: {
          const display_nameHelper = this.findHelperById(block, HelperIds.display_nameHelper);
          let match = InputValidator.validateName(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            display_nameHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            display_nameHelper.hide();
          }

          break;
        }

        case InputIds.old_password: {
          const old_passwordHelper = this.findHelperById(block, HelperIds.oldPasswordHelper);
          let match = InputValidator.validatePass(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            old_passwordHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            old_passwordHelper.hide();
          }

          break;
        }

        case InputIds.password: {
          const passwordHelper = this.findHelperById(block, HelperIds.passwordHelper);
          let match = InputValidator.validatePass(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            passwordHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            passwordHelper.hide();
          }

          break;
        }

        case InputIds.phone: {
          const phoneHelper = this.findHelperById(block, HelperIds.phoneHelper);
          let match = InputValidator.validatePhone(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            phoneHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            phoneHelper.hide();
          }

          break;
        }

        case InputIds.repeatepassword: {
          const password = this.findInputById(block, InputIds.password);
          const repeatepasswordHelper = this.findHelperById(block, HelperIds.repeatepasswordHelper);
          let pass = password.getValue();
          pass = this.sanitaize(pass);
          let isNotEqual = str !== pass;

          if (isNotEqual) {
            this.setError(element);
            input.setValidate(false);
            repeatepasswordHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            repeatepasswordHelper.hide();
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

  checkButtonEnable(block: Block) {
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

  onBlurValidate(element: EventTarget | HTMLInputElement, block: Block) {
    if (element instanceof HTMLInputElement) {
      this.validateInput(element, block);

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

  findInputById(block: Block, id: string): SingupFormInput {
    return Object.values(block.children)
      .filter((child) => child instanceof SingupFormInput)
      .filter(
        (child) => (child as SingupFormInput).getId() === id
      )[0] as SingupFormInput;
  }

  findHelperById(block: Block, id: string): HelperLabel {
    return Object.values(block.children)
      .filter((child) => child instanceof HelperLabel)
      .filter(
        (child) => (child as HelperLabel).getId() === id
      )[0] as HelperLabel;
  }
}

export default new ElementValidator();
