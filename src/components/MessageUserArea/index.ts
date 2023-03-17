/* eslint-disable class-methods-use-this */
import { UserInfo } from '../../api/ChatsAPI';
import Block from '../../utils/Block';
import { withStore } from '../../utils/withStore';
import { AvatarImage } from '../AvatarImage/index';
import template from './messageUserArea.hbs';
import * as styles from './styles.module.pcss';

interface MessageUserAreaProps {
  selectedChat: number | undefined;
  userData: UserInfo;
  name: string;
}

class MessageUserAreaBase extends Block<MessageUserAreaProps> {
  constructor(props: MessageUserAreaProps) {
    super({ ...props });
  }

  protected init(): void {
    this.children.avatar = new AvatarImage({
      path: this.props.userData?.avatarPers,
    });
  }

  protected componentDidUpdate(
    oldProps: MessageUserAreaProps,
    newProps: MessageUserAreaProps,
  ): boolean {
    this.children.avatar = new AvatarImage({
      path: newProps.userData?.avatarPers,
    });
    return true;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChatInfo = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      userData: undefined,
      selectedChat: undefined,
    };
  }
  const selectedChatInfo = state.usersData.filter(
    (u) => u.id === selectedChatId,
  )[0];

  return {
    userData: selectedChatInfo,
    selectedChat: state.selectedChat,
    name: selectedChatInfo.title,
  };
});

export const MessageUserArea = withChatInfo(MessageUserAreaBase);
