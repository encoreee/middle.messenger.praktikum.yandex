import Block from '../../utils/Block';
import template from './usersArea.hbs';
import * as styles from './styles.module.pcss';
import { UserCell } from '../UserCell';
import { withStore } from '../../utils/withStore';
import { UserInfo } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import { SingupFormButton } from '../SingupFormButton';
import { ModalAddChat } from '../ModalAddChat';
import { ModalAddUser } from '../ModalAddUser';

interface UsersAreaProps {
  usersData: UserInfo[];
  isLoaded: boolean;
  selectedChat: number | undefined;
  userId: number;
}

class UsersAreaBase extends Block<UsersAreaProps> {
  constructor(props: UsersAreaProps) {
    super({ ...props });
  }

  init() {
    this.constractArea(this.props)
  }

  private constractArea(props : UsersAreaProps){
    this.children.userCells = this.createUserCells(props);

    const modalChat = new ModalAddChat({});
    this.children.modalAddChat = modalChat;
    modalChat.disable();

    const modalUser = new ModalAddUser({ ...props });
    this.children.modalAddUser = modalUser;
    modalUser.disable();

    this.children.buttonChat = new SingupFormButton({
      label: 'Создать новый чат',
      type: 'Submit',
      events: {
        click: (event) => {
          event.preventDefault();
          modalChat.enable();
        },
      },
    });

    this.children.buttonUser = new SingupFormButton({
      label: 'Добавить пользователя',
      type: 'Submit',
      events: {
        click: (event) => {
          event.preventDefault();
          modalUser.enable();
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: UsersAreaProps,
    newProps: UsersAreaProps
  ): boolean {
    this.constractArea(newProps)
    return true;
  }

  private createUserCells(props: UsersAreaProps) {
    return props.usersData.map((data) => {
      return new UserCell({
        id: data.id,
        name: data.title,
        message: data.last_message?.content,
        time: data.last_message?.time,
        messageCount: data.unread_count,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      usersData: [...(state.usersData || [])],
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    usersData: [...(state.usersData || [])],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const UsersArea = withChats(UsersAreaBase);
