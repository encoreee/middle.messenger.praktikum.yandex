import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import InputValidator from '../../utils/InputValidator';
import { SingupFormButton } from '../SingupFormButton';
import { SingupFormInput } from '../SingupFormInput';
import { CloseSpan } from '../CloseSpan';
import template from './modalAddChat.hbs';
import * as styles from './styles.module.pcss';

export interface ModalAddChatProps {
  text?: string;
  events?: {
    click: (event: Event) => void;
  };
}

export class ModalAddChat extends Block<ModalAddChatProps> {
  constructor(props: ModalAddChatProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => this.onTarget(event),
      },
    });
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
      placeholder: 'Введите название',
      events: {},
    });

    this.children.nameInput = input;
    this.children.button = new SingupFormButton({
      label: 'Создать',
      type: 'Submit',
      events: {
        click: (event) => {
          event.preventDefault();
          this.onAddNewChat(input);
        },
      },
    });
  }

  onAddNewChat(input: SingupFormInput) {
    const value = input.getValue();
    const match = InputValidator.validateName(value);
    if (match) {
      ChatsController.create(value).finally(() => {
        (this.children.usersArea as Block).setProps({
          isLoaded: true,
        });
      });

      ChatsController.fetchChats().finally(() => {
        (this.children.usersArea as Block).setProps({
          isLoaded: true,
        });
      });
    }

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
      const element = event.target as HTMLElement;
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
