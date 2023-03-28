import Block from '../../utils/Block';
import template from './myMessage.hbs';
import styles from './styles.module.pcss';
import checked from '../../../static/checked.svg';

export interface MessageProps {
  message: string;
  time: string;
}

export class MyMessage extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, checked, styles });
  }
}
