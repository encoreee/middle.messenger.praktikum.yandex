import Block from '../../utils/Block';
import template from './messageInput.hbs';
import * as styles from './styles.module.pcss';

interface MessageInputProps {}

export class MessageInput extends Block<MessageInputProps> {
  constructor(props: MessageInputProps) {
    super({ ...props });
  }

  init() {}
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
