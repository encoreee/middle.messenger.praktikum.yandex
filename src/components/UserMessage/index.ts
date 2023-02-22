import Block from '../../utils/Block';
import template from './userMessage.hbs';
import * as styles from './styles.module.pcss';
import { MessageProps } from '../MyMessage';


export class UserMessage extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
