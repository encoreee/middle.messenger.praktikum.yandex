import Block from '../../utils/Block';
import template from './titleLabel.hbs';
import * as styles from './styles.module.pcss';

interface TitleLabelProps {
  label: string;
}

export class TitleLabel extends Block<TitleLabelProps> {
  constructor(props: TitleLabelProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
