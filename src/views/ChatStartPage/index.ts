import { MyUserArea } from '../../components/MyUserArea';
import { UsersArea } from '../../components/UsersArea';
import Block from '../../utils/Block';
import template from './chatStartPage.hbs';
import styles from './styles.module.pcss';
import { MessageArea } from './../../components/MessageArea';


export class ChatStartPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.myUserArea = new MyUserArea({
    });

    this.children.usersArea = new UsersArea({
    });

    this.children.messageArea = new MessageArea({
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
