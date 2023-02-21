import Block from '../../utils/Block';
import template from './singinFormButton.hbs';
import styles from './styles.module.pcss';

interface SinginFormButtonProps {
  label: string;
  events?: {
    click: () => void;
  };
}

export class SinginFormButton extends Block<SinginFormButtonProps> {
  constructor(props: SinginFormButtonProps) {
    super({...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
