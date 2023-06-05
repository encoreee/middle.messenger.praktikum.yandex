/* eslint-disable import/no-cycle */
import { MyUserArea } from '../../components/MyUserArea';
import { UsersArea } from '../../components/UsersArea';
import Block from '../../utils/Block';
import template from './chatPage.hbs';
import styles from './styles.module.pcss';
import { MessageArea } from '../../components/MessageArea';
import ChatsController from '../../controllers/ChatsController';

export class ChatPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.myUserArea = new MyUserArea({});

    this.children.usersArea = new UsersArea({});

    this.children.messageArea = new MessageArea({});

    ChatsController.fetchChats().finally(() => {
      (this.children.usersArea as Block).setProps({
        isLoaded: true,
      });
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
