import Block from '../../utils/Block';
import template from './notSelectedLabel.hbs';
import * as styles from './styles.module.pcss';

interface NotSelectedLabelProps {
  label: string;
}

export class NotSelectedLabel extends Block<NotSelectedLabelProps> {
  constructor(props: NotSelectedLabelProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
