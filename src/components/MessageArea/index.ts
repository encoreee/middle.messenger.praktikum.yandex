import Block from '../../utils/Block';
import template from './messageArea.hbs';
import styles from './styles.module.pcss';
import { NotSelectedLabel } from './../NotSelectedLabel';

interface MessageAreaProps {

}

export class MessageArea extends Block<MessageAreaProps> {
  constructor(props: MessageAreaProps) {
    super({...props });
  }

  init() {
    this.children.notSelectedLabel = new NotSelectedLabel({
      label: 'Выберите чат...',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
