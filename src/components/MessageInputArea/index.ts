import Block from '../../utils/Block';
import template from './messageInputArea.hbs';
import * as styles from './styles.module.pcss';
import { AttachIcon } from './../AttachIcon/index';
import { SendIcon } from './../SendIcon/index';
import { MessageInput } from '../MessageInput';

interface MessageInputAreaProps {}

export class MessageInputArea extends Block<MessageInputAreaProps> {
  constructor(props: MessageInputAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.attachIcon = new AttachIcon({
    });

    this.children.input = new MessageInput({
    });

    this.children.sendIcon = new SendIcon({
    });
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
