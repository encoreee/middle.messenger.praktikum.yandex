import Block from '../../utils/Block';
import template from './singinFormInput.hbs';
import styles from './styles.module.pcss';

interface SinginFormInputProps {
  id: string;
  name?: string;
  placeholder?: string;
}

export class SinginFormInput extends Block<SinginFormInputProps> {
  constructor(props: SinginFormInputProps) {
    super({...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
