import Block from '../../utils/Block';
import template from './nameLabel.hbs';
import styles from './styles.module.pcss';

interface NameLabelProps {
  name: string;
}

export class NameLabel extends Block<NameLabelProps> {
  constructor(props: NameLabelProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
