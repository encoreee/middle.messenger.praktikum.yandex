import dayjs from 'dayjs';
import Block from '../../utils/Block';
import template from './userCell.hbs';
import * as styles from './styles.module.pcss';
import { UserCellAvatar } from '../UserCellAvatar';

interface UserCellProps {
  id: number;
  name: string;
  message?: string;
  time: string;
  messageCount: number;
  path?: string;
  events?: {
    click: () => void;
  };
}

export class UserCell extends Block<UserCellProps> {
  constructor(props: UserCellProps) {
    super({ ...props });
    this.initMessage = '';
  }

  private initMessage: string;

  init() {
    this.children.avatar = new UserCellAvatar({
      path: this.props.path,
    });

    if (this.props.message) {
      this.initMessage = this.props.message;
    } else {
      this.initMessage = 'Нет сообщений';
    }
  }

  render() {
    const { name, time, messageCount } = this.props;

    const dt = dayjs(time).format('HH:mm');

    return this.compile(template, {
      message: this.initMessage,
      name,
      time: dt,
      messageCount,
      styles,
    });
  }
}
