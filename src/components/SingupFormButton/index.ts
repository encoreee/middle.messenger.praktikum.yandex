import Block from '../../utils/Block';
import template from './singupFormButton.hbs';
import * as styles from './styles.module.pcss';

interface SingupFormButtonProps {
  label: string;
  events: {
    click: (event : Event) => void;
  };
}

export class SingupFormButton extends Block<SingupFormButtonProps> {
  constructor(props: SingupFormButtonProps) {
    super({...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
