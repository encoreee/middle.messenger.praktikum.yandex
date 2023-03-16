/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable class-methods-use-this */
import { SingupFormButton } from '../components/SingupFormButton';
import { SingupFormInput } from '../components/SingupFormInput';
import Block from './Block';
import { HelperIds, InputIds } from './ElementIds';
import InputValidator from './InputValidator';
import { HelperLabel } from '../components/HelperLabel/index';

export class ElementValidator {
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
                (child as SingupFormInput).getId() === InputIds.password,
            )[0] as SingupFormInput;

          return element.value === password.getValue();
        }
        default:
          return false;
      }
    }
    return false;
  }

  sanitaize(str: string) {
    return str.replace(/[^\w. ]/gi, (c) => `&#${c.charCodeAt(0)};`);
  }

  validateInput(element: HTMLInputElement | null, block: Block) {
    if (element) {
      const input = this.findInputById(block, element.id);

      // let str = this.sanitaize(element.value);
      const str = element.value;

      switch (element.id) {
        case InputIds.email: {
          const mailHelper = this.findHelperById(block, HelperIds.emailHepler);
          const match = InputValidator.validateMail(str);

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
          const match = InputValidator.validateLogin(str);

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
          const secondNameHelper = this.findHelperById(
            block,
            HelperIds.second_nameHelper,
          );
          const match = InputValidator.validateName(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            secondNameHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            secondNameHelper.hide();
          }

          break;
        }
        case InputIds.first_name: {
          const firstNameHelper = this.findHelperById(
            block,
            HelperIds.first_nameHelper,
          );
          const match = InputValidator.validateName(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            firstNameHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            firstNameHelper.hide();
          }

          break;
        }

        case InputIds.display_name: {
          const displayNameHelper = this.findHelperById(
            block,
            HelperIds.display_nameHelper,
          );
          const match = InputValidator.validateName(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            displayNameHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            displayNameHelper.hide();
          }

          break;
        }

        case InputIds.old_password: {
          const oldPasswordHelper = this.findHelperById(
            block,
            HelperIds.oldPasswordHelper,
          );
          const match = InputValidator.validatePass(str);

          if (!match) {
            this.setError(element);
            input.setValidate(false);
            oldPasswordHelper.show();
          } else {
            this.setIdle(element);
            input.setValidate(true);
            oldPasswordHelper.hide();
          }

          break;
        }

        case InputIds.password: {
          const passwordHelper = this.findHelperById(
            block,
            HelperIds.passwordHelper,
          );
          const match = InputValidator.validatePass(str);

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
          const match = InputValidator.validatePhone(str);

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
          const repeatepasswordHelper = this.findHelperById(
            block,
            HelperIds.repeatepasswordHelper,
          );
          let pass = password.getValue();
          pass = this.sanitaize(pass);
          const isNotEqual = str !== pass;

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

        default:
          break;
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
          // statements;
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
      (child) => child instanceof SingupFormButton,
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
    const elementToMod = element;
    if (elementToMod instanceof HTMLElement) {
      elementToMod.style.backgroundColor = 'LightPink';
      elementToMod.style.opacity = '0.6';
    }
  }

  setIdle(element: EventTarget) {
    const elementToMod = element;
    if (elementToMod instanceof HTMLElement) {
      elementToMod.style.backgroundColor = 'white';
      elementToMod.style.opacity = '1';
    }
  }

  findInputById(block: Block, id: string): SingupFormInput {
    return Object.values(block.children)
      .filter((child) => child instanceof SingupFormInput)
      .filter(
        (child) => (child as SingupFormInput).getId() === id,
      )[0] as SingupFormInput;
  }

  findHelperById(block: Block, id: string): HelperLabel {
    return Object.values(block.children)
      .filter((child) => child instanceof HelperLabel)
      .filter(
        (child) => (child as HelperLabel).getId() === id,
      )[0] as HelperLabel;
  }
}

export default new ElementValidator();
