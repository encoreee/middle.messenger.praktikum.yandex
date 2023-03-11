import Block from '../../utils/Block';
import template from './messageConvArea.hbs';
import * as styles from './styles.module.pcss';
import { MyMessage } from './../MyMessage/index';
import { Message } from '../MessageArea';
import { UserMessage } from './../UserMessage/index';

interface MessageConvAreaProps {
  messages: Message[];
}

export class MessageConvArea extends Block<MessageConvAreaProps> {
  constructor(props: MessageConvAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.messages = this.props.messages.map((message) => {
      if (message.isMy) {
        return new MyMessage({
          text: message.text,
          time: message.time,
        });
      }

      return new UserMessage({
        text: message.text,
        time: message.time,
      });
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
