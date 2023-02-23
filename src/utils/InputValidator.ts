export class InputValidator {
  constructor() {}

  validateLogin(str: string) {
    let ifRightLength = str.length < 3 || str.length > 20;
    let lettersMatch = str.match(/[^0-9^A-Z^А-Я^a-z^а-я^ё^Ё^-^_]/);
    let onlyDigits = str.match(/^\d+$/);

    if (ifRightLength || lettersMatch || onlyDigits) {
      return false;
    } else {
      return true;
    }
  }

  validateMail(str: string) {
    let match = str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (match) {
      return true;
    } else return false;
  }

  validateName(str: string) {
    let caseMatch = str.match(/^[^A-Z^А-Я]/);
    let lettersMatch = str.match(/.[^a-z^а-я^ё^-]/);

    if (caseMatch || lettersMatch) {
      return false;
    } else return true;
  }

  validatePass(str: string) {
    let ifRightLength = str.length < 8 || str.length > 40;
    let lettersMatch = str.match(/[^0-9^A-Z^А-Я^a-z^а-я^ё^Ё^]/);
    let haveCase = str.match(/[A-ZА-Я]/);
    let haveDigits = str.match(/[0-9]/);

    if (ifRightLength || lettersMatch || !haveCase || !haveDigits) {
      return false;
    } else return true;
  }
}

export default new InputValidator();
