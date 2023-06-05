/* eslint-disable implicit-arrow-linebreak */
import Block from '../../utils/Block';
import template from './usersArea.hbs';
import styles from './styles.module.pcss';
import { UserCell } from '../UserCell';
import { withStore } from '../../utils/withStore';
import { UserInfo } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import { SingupFormButton } from '../SingupFormButton';
import { ModalAddChat } from '../ModalAddChat';
import { ModalAddUser } from '../ModalAddUser';
import { User } from '../../contracts/auth';
import { ModalDeleteChat } from '../ModalDeleteChat';

interface UsersAreaProps {
  usersData: UserInfo[];
  isLoaded: boolean;
  selectedChat: number | undefined;
  chatUsers: User[] | undefined;
  userId: number;
}

export const Buttons: {
  buttonChat: string;
  buttonUser: string;
  buttonDeleteChat: string;
} = {
  buttonChat: 'buttonChat',
  buttonUser: 'buttonUser',
  buttonDeleteChat: 'buttonDeleteChat',
};

class UsersAreaBase extends Block<UsersAreaProps> {
  constructor(props: UsersAreaProps) {
    super({ ...props });
  }

  init() {
    this.constractArea(this.props);
  }

  protected componentDidUpdate(newProps: UsersAreaProps): boolean {
    this.constractArea(newProps);
    return true;
  }

  private async constractArea(props: UsersAreaProps) {
    this.children.userCells = UsersAreaBase.createUserCells(props);

    const modalChat = new ModalAddChat({});
    this.children.modalAddChat = modalChat;
    modalChat.disable();

    const modalUser = new ModalAddUser({ ...props });
    this.children.modalAddUser = modalUser;
    modalUser.disable();

    const modalDeleteChat = new ModalDeleteChat({ ...props });
    this.children.modalDeleteChat = modalDeleteChat;

    this.children.buttonChat = new SingupFormButton({
      id: Buttons.buttonChat,
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
      id: Buttons.buttonUser,
      label: 'Добавить пользователя',
      type: 'Submit',
      events: {
        click: (event) => {
          event.preventDefault();
          modalUser.enable();
        },
      },
    });

    this.children.buttonDeleteChat = new SingupFormButton({
      id: Buttons.buttonDeleteChat,
      label: 'Удалить чат',
      type: 'Submit',
      events: {
        click: (event) => {
          event.preventDefault();
          modalDeleteChat.enable();
        },
      },
    });

    const buttons = Object.values(this.children).filter(
      (child) => child instanceof SingupFormButton,
    ) as SingupFormButton[];

    const button = buttons.filter((b) => b.getId() === Buttons.buttonUser)[0];

    if (props.selectedChat) {
      button.setDisable(false);
    } else {
      button.setDisable(true);
    }
  }

  private static createUserCells(props: UsersAreaProps) {
    return props.usersData.map(
      (data) =>
        new UserCell({
          id: data.id,
          name: data.title,
          message: data.last_message?.content,
          time: data.last_message?.time,
          messageCount: data.unread_count,
          path: data.avatarPers,
          events: {
            click: () => {
              ChatsController.selectChat(data.id);
            },
          },
        }),
    );
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
      chatUsers: undefined,
      userId: state.user.id,
    };
  }

  return {
    usersData: [...(state.usersData || [])],
    selectedChat: state.selectedChat,
    chatUsers: state.chatUsers,
    userId: state.user.id,
  };
});

export const UsersArea = withChats(UsersAreaBase);
