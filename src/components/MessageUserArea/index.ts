import Block from '../../utils/Block';
import template from './messageUserArea.hbs';
import * as styles from './styles.module.pcss';

interface MessageUserAreaProps {}

export class MessageUserArea extends Block<MessageUserAreaProps> {
  constructor(props: MessageUserAreaProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
