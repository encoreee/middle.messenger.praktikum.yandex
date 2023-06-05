import Block from '../../utils/Block';
import template from './messageInputArea.hbs';
import styles from './styles.module.pcss';
import { AttachIcon } from '../AttachIcon/index';
import { SendIcon } from '../SendIcon/index';
import { MessageInput } from '../MessageInput';
import MessagesController from '../../controllers/MessagesController';
import InputValidator from '../../utils/InputValidator';

interface MessageInputAreaProps {
  selectedChat: number | undefined;
}

export class MessageInputArea extends Block<MessageInputAreaProps> {
  constructor(props: MessageInputAreaProps) {
    super({ ...props });
  }

  onEventAction() {
    const input = this.children.input as MessageInput;
    const message = input.getValue();

    const valid = InputValidator.validateMessage(message);

    if (valid) {
      input.setValue('');
      if (this.props.selectedChat) {
        MessagesController.sendMessage(this.props.selectedChat, message);
      }
    } else {
      console.error('Сообщение не валидное');
    }
  }

  init() {
    this.children.attachIcon = new AttachIcon({});

    this.children.input = new MessageInput({
      id: 'messageInput',
      name: 'message',

      events: {
        keypress: (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            this.onEventAction();
          }
        },
      },
    });

    this.children.sendIcon = new SendIcon({
      events: {
        click: () => {
          this.onEventAction();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
