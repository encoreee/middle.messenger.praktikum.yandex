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

  validateInput(element: HTMLInputElement | null, block: Block) {
    if (element) {
      switch (element.id) {
        case InputIds.email: {
          const mailInput = this.findInputById(block, InputIds.email);
          const mailHelper = this.findHelperById(block, HelperIds.emailHepler);

          let match = InputValidator.validateMail(element.value);

          if (!match) {
            this.setError(element);
            mailInput.setValidate(false);
            mailHelper.show();
          } else {
            this.setIdle(element);
            mailInput.setValidate(true);
            mailHelper.hide();
          }

          break;
        }
        case InputIds.login: {
          const loginInput = this.findInputById(block, InputIds.login);
          const loginHelper = this.findHelperById(block, HelperIds.loginHelper);

          let match = InputValidator.validateLogin(element.value);

          if (!match) {
            this.setError(element);
            loginInput.setValidate(false);
            loginHelper.show();
          } else {
            this.setIdle(element);
            loginInput.setValidate(true);
            loginHelper.hide();
          }

          break;
        }
        case InputIds.second_name: {
          const lastname = this.findInputById(block, InputIds.second_name);
          const second_nameHelper = this.findHelperById(
            block,
            HelperIds.second_nameHelper
          );

          let match = InputValidator.validateName(element.value);

          if (!match) {
            this.setError(element);
            lastname.setValidate(false);
            second_nameHelper.show();
          } else {
            this.setIdle(element);
            lastname.setValidate(true);
            second_nameHelper.hide();
          }

          break;
        }
        case InputIds.first_name: {
          const name = this.findInputById(block, InputIds.first_name);
          const first_nameHelper = this.findHelperById(
            block,
            HelperIds.first_nameHelper
          );

          let match = InputValidator.validateName(element.value);

          if (!match) {
            this.setError(element);
            name.setValidate(false);
            first_nameHelper.show();
          } else {
            this.setIdle(element);
            name.setValidate(true);
            first_nameHelper.hide();
          }

          break;
        }

        case InputIds.display_name: {
          const displayName = this.findInputById(block, InputIds.display_name);
          const displayNameHelper = this.findHelperById(
            block,
            HelperIds.display_nameHelper
          );

          let match = InputValidator.validateName(element.value);

          if (!match) {
            this.setError(element);
            displayName.setValidate(false);
            displayNameHelper.show();
          } else {
            this.setIdle(element);
            displayName.setValidate(true);
            displayNameHelper.hide();
          }

          break;
        }

        case InputIds.old_password: {
          const oldPassword = this.findInputById(block, InputIds.old_password);
          const oldPasswordHelper = this.findHelperById(
            block,
            HelperIds.oldPasswordHelper
          );

          let match = InputValidator.validatePass(element.value);

          if (!match) {
            this.setError(element);
            oldPassword.setValidate(false);
            oldPasswordHelper.show();
          } else {
            this.setIdle(element);
            oldPassword.setValidate(true);
            oldPasswordHelper.hide();
          }

          break;
        }

        case InputIds.password: {
          const password = this.findInputById(block, InputIds.password);
          const passwordHelper = this.findHelperById(
            block,
            HelperIds.passwordHelper
          );

          let match = InputValidator.validatePass(element.value);

          if (!match) {
            this.setError(element);
            password.setValidate(false);
            passwordHelper.show();
          } else {
            this.setIdle(element);
            password.setValidate(true);
            passwordHelper.hide();
          }

          break;
        }

        case InputIds.phone: {
          const phone = this.findInputById(block, InputIds.phone);
          const phoneHelper = this.findHelperById(block, HelperIds.phoneHelper);

          let match = InputValidator.validatePhone(element.value);

          if (!match) {
            this.setError(element);
            phone.setValidate(false);
            phoneHelper.show();
          } else {
            this.setIdle(element);
            phone.setValidate(true);
            phoneHelper.hide();
          }

          break;
        }

        case InputIds.repeatepassword: {
          const repeatepassword = this.findInputById(
            block,
            InputIds.repeatepassword
          );
          const password = this.findInputById(block, InputIds.password);
          const repeatepasswordHelper = this.findHelperById(
            block,
            HelperIds.repeatepasswordHelper
          );

          let pass = password.getValue();

          let isNotEqual = element.value !== pass;

          if (isNotEqual) {
            this.setError(element);
            repeatepassword.setValidate(false);
            repeatepasswordHelper.show();
          } else {
            this.setIdle(element);
            repeatepassword.setValidate(true);
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
