import Block from '../../utils/Block';
import template from './singupFormInput.hbs';
import * as styles from './styles.module.pcss';

interface SingupFormInputProps {
  id: string;
  name?: string;
  placeholder?: string;
}

export class SingupFormInput extends Block<SingupFormInputProps> {
  constructor(props: SingupFormInputProps) {
    super({...props });
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
