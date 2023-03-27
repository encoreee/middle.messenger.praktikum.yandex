/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
class InputValidator {
  validateMessage(str: string) {
    const ifRightLength = str.length < 1 || str.length > 1000;

    if (ifRightLength) {
      return false;
    }
    return true;
  }

  validateLogin(str: string) {
    const ifRightLength = str.length < 3 || str.length > 20;
    const lettersMatch = str.match(/[^0-9^A-Z^А-Я^a-z^а-я^ё^Ё^-^_]/);
    const onlyDigits = str.match(/^\d+$/);

    if (ifRightLength || lettersMatch || onlyDigits) {
      return false;
    }
    return true;
  }

  validateMail(str: string) {
    const match = str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (match) {
      return true;
    }
    return false;
  }

  validateName(str: string) {
    const caseMatch = str.match(/^[^A-Z^А-Я]/);
    const lettersMatch = str.match(/.[^a-z^а-я^ё^-]/);
    const zeroLength = str.length === 0;

    if (caseMatch || lettersMatch || zeroLength) {
      return false;
    }
    return true;
  }

  validatePass(str: string) {
    const ifRightLength = str.length < 8 || str.length > 40;
    const lettersMatch = str.match(/[^0-9^A-Z^А-Я^a-z^а-я^ё^Ё^]/);
    const haveCase = str.match(/[A-ZА-Я]/);
    const haveDigits = str.match(/[0-9]/);

    if (ifRightLength || lettersMatch || !haveCase || !haveDigits) {
      return false;
    }
    return true;
  }

  validatePhone(str: string) {
    const match = str.match(/[+]?\d{10,15}/);

    if (match) {
      return true;
    }
    return false;
  }
}

export default new InputValidator();
