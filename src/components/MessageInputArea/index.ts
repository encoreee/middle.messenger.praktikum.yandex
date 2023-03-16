import Block from '../../utils/Block';
import template from './messageInputArea.hbs';
import * as styles from './styles.module.pcss';
import { AttachIcon } from '../AttachIcon/index';
import { SendIcon } from '../SendIcon/index';
import { MessageInput } from '../MessageInput';
import MessagesController from '../../controllers/MessagesController';

interface MessageInputAreaProps {
  selectedChat: number | undefined;
}

export class MessageInputArea extends Block<MessageInputAreaProps> {
  constructor(props: MessageInputAreaProps) {
    super({ ...props });
  }

  private selectedChat: number | undefined;

  protected componentDidUpdate(
    oldProps: MessageInputAreaProps,
    newProps: MessageInputAreaProps,
  ): boolean {
    this.selectedChat = newProps.selectedChat;

    return true;
  }

  init() {
    this.children.attachIcon = new AttachIcon({});

    this.children.input = new MessageInput({
      id: 'messageInput',
      name: 'message',
    });

    this.children.sendIcon = new SendIcon({
      events: {
        click: () => {
          const input = this.children.input as MessageInput;
          const message = input.getValue();

          input.setValue('');

          if (this.props.selectedChat) {
            MessagesController.sendMessage(this.props.selectedChat, message);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
