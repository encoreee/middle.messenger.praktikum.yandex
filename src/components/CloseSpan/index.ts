import Block from '../../utils/Block';
import template from './closeSpan.hbs';
import styles from './styles.module.pcss';

export interface CloseSpanProps {
  text?: string;
  events: {
    click: (event: Event) => void;
  };
}

export class CloseSpan extends Block<CloseSpanProps> {
  constructor(props: CloseSpanProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
