import Block from '../../utils/Block';
import template from './myMessage.hbs';
import styles from './styles.module.pcss';

interface MyMessageProps {
  text: string;
  time: string;
}

export class MyMessage extends Block<MyMessageProps> {
  constructor(props: MyMessageProps) {
    super({...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
