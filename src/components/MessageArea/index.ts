/* eslint-disable @typescript-eslint/no-unused-vars */
import Block from '../../utils/Block';
import template from './messageArea.hbs';
import * as styles from './styles.module.pcss';
import { NotSelectedLabel } from '../NotSelectedLabel';
import { MessageUserArea } from '../MessageUserArea/index';
import { MessageConvArea } from '../MessageConvArea';
import { MessageInputArea } from '../MessageInputArea/index';
import { withStore } from '../../utils/withStore';
import { Message } from '../../contracts/message';

interface MessageAreaProps {
  selectedChat: number | undefined;
  messages: Message[];
  userId: number;
}

class MessageAreaBase extends Block<MessageAreaProps> {
  constructor(props: MessageAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.notSelectedLabel = new NotSelectedLabel({
      label: 'Выберите чат...',
    });

    this.children.messageUserArea = new MessageUserArea({});

    this.children.messageConvArea = new MessageConvArea({
      messages: this.props.messages,
      userId: this.props.userId,
    });

    this.children.messageInputArea = new MessageInputArea({ selectedChat: this.props.selectedChat });
  }

  protected componentDidUpdate(
    oldProps: MessageAreaProps,
    newProps: MessageAreaProps,
  ): boolean {
    this.children.messageInputArea = new MessageInputArea({ selectedChat: this.props.selectedChat });
    this.children.messageConvArea = new MessageConvArea({
      messages: this.props.messages,
      userId: this.props.userId,
    });

    return true;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const MessageArea = withSelectedChatMessages(MessageAreaBase);
