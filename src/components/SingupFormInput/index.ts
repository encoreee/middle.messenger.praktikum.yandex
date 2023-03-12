import Block from '../../utils/Block';
import template from './singupFormInput.hbs';
import * as styles from './styles.module.pcss';

interface SingupFormInputProps {
  id: string;
  name?: string;
  placeholder?: string;

  events?: {
    blur?: (event: Event) => void;
    focus?: (event: Event) => void;
  };
}

export class SingupFormInput extends Block<SingupFormInputProps> {
  constructor(props: SingupFormInputProps) {
    super({ ...props });
    this.isValidate = false;
  }

  public isValidate: boolean;

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  public setError() {
    return this.element as HTMLInputElement;
  }

  public setIdle() {
    return (this.element as HTMLInputElement).value;
  }

  public getValidate() {
    return this.isValidate;
  }

  public setValidate(validate: boolean) {
    return (this.isValidate = validate);
  }

  public getId() {
    return this.props.id;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
