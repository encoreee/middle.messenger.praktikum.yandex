import Block from '../../utils/Block';
import template from './userCell.hbs';
import * as styles from './styles.module.pcss';

interface UserCellProps {
  id: number;
  name: string;
  message: string;
  time: string;
  messageCount: number;
  events: {
    click: () => void;
  }
}

export class UserCell extends Block<UserCellProps> {
  constructor(props: UserCellProps) {
    super({ ...props });
  }

  init() {}

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
