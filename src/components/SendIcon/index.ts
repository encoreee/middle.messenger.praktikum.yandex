import Block from '../../utils/Block';
import template from './sendIcon.hbs';
import * as styles from './styles.module.pcss';

interface SendIconProps {}

export class SendIcon extends Block<SendIconProps> {
  constructor(props: SendIconProps) {
    super({ ...props });
  }

  init() {
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
