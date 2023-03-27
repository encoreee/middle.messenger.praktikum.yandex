import dayjs from 'dayjs';
import Block from '../../utils/Block';
import template from './messageConvArea.hbs';
import * as styles from './styles.module.pcss';
import { MyMessage } from '../MyMessage/index';
import { UserMessage } from '../UserMessage/index';
import { Message } from '../../contracts/message';

interface MessageConvAreaProps {
  messages: Message[];
  userId: number;
}

export class MessageConvArea extends Block<MessageConvAreaProps> {
  constructor(props: MessageConvAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.messages = MessageConvArea.createMessages(this.props);
  }

  protected componentDidUpdate(newProps: MessageConvAreaProps): boolean {
    this.children.messages = MessageConvArea.createMessages(newProps);

    return true;
  }

  private static createMessages(props: MessageConvAreaProps) {
    return props.messages.map((data) => {
      const dt = dayjs(data.time).format('HH:mm');
      const content = {
        message: data.content,
        time: dt,
      };

      if (props.userId === data.user_id) {
        return new MyMessage(content);
      }
      return new UserMessage(content);
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
