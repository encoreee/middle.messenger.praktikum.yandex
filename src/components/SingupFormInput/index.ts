import Block from '../../utils/Block';
import template from './singupFormInput.hbs';
import styles from './styles.module.pcss';

interface SingupFormInputProps {
  id: string;
  name?: string;
  placeholder?: string;
}

export class SingupFormInput extends Block<SingupFormInputProps> {
  constructor(props: SingupFormInputProps) {
    super({...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
