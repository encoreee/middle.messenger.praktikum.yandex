import Block from '../../utils/Block';
import template from './linkLabel.hbs';
import styles from './styles.module.pcss';

interface LinkLabelProps {
  label: string;
}

export class LinkLabel extends Block<LinkLabelProps> {
  constructor(props: LinkLabelProps) {
    super({...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
