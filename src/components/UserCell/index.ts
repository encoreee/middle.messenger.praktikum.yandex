import Block from '../../utils/Block';
import template from './userCell.hbs';
import * as styles from './styles.module.pcss';
import dayjs from 'dayjs';
import { UserCellAvatar } from '../UserCellAvatar';

interface UserCellProps {
  id: number;
  name: string;
  message?: string;
  time: string;
  messageCount: number;
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
      path: '',
    });

   


    if (this.props.message) {
      this.initMessage = this.props.message;
    }
    else{
      this.initMessage = 'Нет сообщений';
    }
  }

  render() {
    let { name, time, messageCount } = this.props;

    let dt = dayjs(time).format('HH:mm');

    return this.compile(template, {
      message: this.initMessage,
      name: name,
      time: dt,
      messageCount: messageCount,
      styles,
    });
  }
}
