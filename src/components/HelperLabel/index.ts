import Block from '../../utils/Block';
import template from './helperLabel.hbs';
import * as styles from './styles.module.pcss';

interface HelperLabelProps {
  id: string;
  label: string;
}

export class HelperLabel extends Block<HelperLabelProps> {
  constructor(props: HelperLabelProps) {
    super({ ...props });
  }

  show() {
    if (this.element instanceof HTMLElement) {
      this.element.style.display = 'block';
      
    }
  }

  hide() {
    if (this.element instanceof HTMLElement) {
      this.element.style.display = 'none';
    }
  }

  public getId() {
    return this.props.id;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
