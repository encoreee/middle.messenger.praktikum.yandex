import Block from '../../utils/Block';
import template from './mainLabel.hbs';
import * as styles from './styles.module.pcss';

interface MainLabelProps {
  label: string;
}

export class MainLabel extends Block<MainLabelProps> {
  constructor(props: MainLabelProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
