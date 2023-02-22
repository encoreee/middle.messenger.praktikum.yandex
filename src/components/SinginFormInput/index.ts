import Block from '../../utils/Block';
import template from './singinFormInput.hbs';
import * as styles from './styles.module.pcss';

interface SinginFormInputProps {
  id: string;
  name?: string;
  placeholder?: string;
}

export class SinginFormInput extends Block<SinginFormInputProps> {
  constructor(props: SinginFormInputProps) {
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
