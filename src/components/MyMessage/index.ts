import Block from '../../utils/Block';
import template from './myMessage.hbs';
import * as styles from './styles.module.pcss';

export interface MessageProps {
  text: string;
  time: string;
}

export class MyMessage extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
