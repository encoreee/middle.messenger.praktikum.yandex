import Block from '../../utils/Block';
import template from './messageInput.hbs';
import styles from './styles.module.pcss';

interface MessageInputProps {
  id: string;
  name: string;
}

export class MessageInput extends Block<MessageInputProps> {
  constructor(props: MessageInputProps) {
    super({ ...props });
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  public setValue(value: string) {
    const element = this.element as HTMLInputElement;
    element.value = value;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
