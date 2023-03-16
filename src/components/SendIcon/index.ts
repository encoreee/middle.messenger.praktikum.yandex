import Block from '../../utils/Block';
import template from './sendIcon.hbs';
import * as styles from './styles.module.pcss';
import send from '../../../static/send.svg';

interface SendIconProps {}

export class SendIcon extends Block<SendIconProps> {
  constructor(props: SendIconProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { send, styles });
  }
}
