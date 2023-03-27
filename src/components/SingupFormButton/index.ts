import Block from '../../utils/Block';
import template from './singupFormButton.hbs';
import * as styles from './styles.module.pcss';

interface SingupFormButtonProps {
  id?: string;
  label: string;
  type: string;
  events: {
    click: (event: Event) => void;
  };
}

export class SingupFormButton extends Block<SingupFormButtonProps> {
  constructor(props: SingupFormButtonProps) {
    super({ ...props });
  }

  setDisable(disable: boolean) {
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = disable;
    }
  }

  public getId() {
    return this.props.id;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
