import Block from '../../utils/Block';
import template from './messageArea.hbs';
import styles from './styles.module.pcss';
import { NotSelectedLabel } from './../NotSelectedLabel';
import { MessageUserArea } from './../MessageUserArea/index';
import { MessageConvArea } from '../MessageConvArea';

interface MessageAreaProps {}

export class MessageArea extends Block<MessageAreaProps> {
  constructor(props: MessageAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.notSelectedLabel = new NotSelectedLabel({
      label: 'Выберите чат...',
    });

    this.children.messageUserArea = new MessageUserArea({});

    this.children.messageConvArea = new MessageConvArea({});
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
