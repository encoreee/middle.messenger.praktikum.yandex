import Block from '../../utils/Block';
import template from './singupFormInput.hbs';
import styles from './styles.module.pcss';

interface SingupFormInputProps {
  id: string;
  name?: string;
  placeholder?: string;
  value?: string;

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

  public setValue(value: string) {
    const element = this.element as HTMLInputElement;
    element.value = value;
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
    this.isValidate = validate;
  }

  public getId() {
    return this.props.id;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
