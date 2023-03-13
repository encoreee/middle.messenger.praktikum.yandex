import Block from '../../utils/Block';
import template from './messageConvArea.hbs';
import * as styles from './styles.module.pcss';
import { MyMessage } from './../MyMessage/index';
import { UserMessage } from './../UserMessage/index';
import { Message } from '../../contracts/message';
import dayjs from 'dayjs';

interface MessageConvAreaProps {
  messages: Message[];
  userId: number;
}

export class MessageConvArea extends Block<MessageConvAreaProps> {
  constructor(props: MessageConvAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.messages = this.createMessages(this.props);
  }

  protected componentDidUpdate(
    oldProps: MessageConvAreaProps,
    newProps: MessageConvAreaProps
  ): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessageConvAreaProps) {
    return props.messages.map((data) => {
      let dt = dayjs(data.time).format('HH:mm');
      let content = {
        message: data.content,
        time: dt,}
      
      if (props.userId === data.user_id) {
        return new MyMessage(content);
      } else {
        return new UserMessage(content);
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
