import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { withStore } from '../../utils/withStore';
import { SingupFormButton } from '../SingupFormButton/index';
import template from './modalDeleteChat.hbs';
import styles from './styles.module.pcss';

export interface ModalDeleteChatProps {
  selectedChat?: number;
  text?: string;
  events?: {
    click: (event: Event) => void;
  };
}

export class ModalDeleteChatBase extends Block<ModalDeleteChatProps> {
  constructor(props: ModalDeleteChatProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => this.onTarget(event),
      },
    });
  }

  protected componentDidUpdate(): boolean {
    this.disable();
    return true;
  }

  enable() {
    if (this.element) {
      this.element.style.display = 'flex';
    }
  }

  disable() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  protected init(): void {
    this.children.button = new SingupFormButton({
      label: 'Удалить',
      type: 'Submit',
      events: {
        click: (event) => {
          event.preventDefault();
          this.onDeleteChat(this.props.selectedChat);
        },
      },
    });
    this.disable();
  }

  onDeleteChat(id?: number) {
    if (id) {
      ChatsController.delete(id);

      ChatsController.fetchChats();
    }

    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  private onTarget(event: Event) {
    if (event.target as HTMLElement) {
      const element = event.target as HTMLElement;
      if (element.className.includes(styles.modal)) {
        this.element!.style.display = 'none';
      }
    }
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      styles,
    });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;
  if (!selectedChatId) {
    return {
      selectedChat: undefined,
      userId: state.user.id,
    };
  }

  return {
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const ModalDeleteChat = withSelectedChatMessages(ModalDeleteChatBase);
