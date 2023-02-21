import Block from '../../utils/Block';
import template from './userArea.hbs';
import styles from './styles.module.pcss';
import { UserCell } from '../UserCell';

interface UsersAreaProps {}

interface User {
  name: string;
  message: string;
  time: string;
  messageCount: number;
}

let userData: User[] = [];

userData.push({
  name: 'Алекандр',
  message: 'Какое то сообщение',
  time: '20:23',
  messageCount: 4,
});
userData.push({
  name: 'Вика',
  message: 'Привет, как дела?',
  time: '11:21',
  messageCount: 1,
});
userData.push({
  name: 'Настя',
  message: 'Расскажи ка мне...',
  time: '23:00',
  messageCount: 2,
});
userData.push({
  name: 'Артем',
  message: 'А ты знаешь...',
  time: '10:25',
  messageCount: 5,
});

export class UsersArea extends Block<UsersAreaProps> {
  constructor(props: UsersAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.userCells = userData.map((user) => {
      return new UserCell({
        name : user.name,
        message : user.message,
        time : user.time,
        messageCount : user.messageCount
      });
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
