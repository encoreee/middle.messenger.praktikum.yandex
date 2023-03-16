import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import { CloseSpan } from '../CloseSpan';
import template from './modalAddChat.hbs';
import * as styles from './styles.module.pcss';
import { withStore } from '../../utils/withStore';

export interface ModalAddUserProps {
  text?: string;
  events?: {
    click: (event: Event) => void;
  };
  selectedChat?: number;
  userId: number;
}

export class ModalAddUser extends Block<ModalAddUserProps> {
  constructor(props: ModalAddUserProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => this.onTarget(event),
      },
    });
  }

  public enable() {
    if (this.element) {
      this.element.style.display = 'flex';
    }
  }
  public disable() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  protected init(): void {
    this.children.closeSpan = new CloseSpan({
      events: {
        click: (event) => {
          event.preventDefault();
          this.onClose();
        },
      },
    });

    const input = new SingupFormInput({
      id: 'nameInput',
      name: 'nameInput',
      placeholder: 'Введите id участника',
      events: {},
    });

    this.children.nameInput = input;
    this.children.button = new SingupFormButton({
      label: 'Добавить',
      type: 'Submit',
      events: {
        click: (event) => {
          event.preventDefault();
          this.onAddNewUser(input);
        },
      },
    });
  }

  onAddNewUser(input: SingupFormInput) {
    const value = input.getValue();
    var number: number = +value;

    if (this.props.selectedChat) {
      ChatsController.addUserToChat(this.props.selectedChat, number);
    }

    ChatsController.fetchChats();

    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  private onClose() {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  private onTarget(event: Event) {
    if (event.target as HTMLElement) {
      let element = event.target as HTMLElement;
      if (element.className.includes('modal')) {
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
