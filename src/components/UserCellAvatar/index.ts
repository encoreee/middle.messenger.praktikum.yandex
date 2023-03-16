import Block from '../../utils/Block';
import template from './userCellAvatar.hbs';
import * as styles from './styles.module.pcss';
import { resorcesPrefix } from '../../api/Prefixis';

interface UserCellAvatarProps {
  path?: string;
  events?: {
    click: (event: Event) => void;
  };
}

export class UserCellAvatar extends Block<UserCellAvatarProps> {
  constructor(props: UserCellAvatarProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, resorcesPrefix, styles });
  }
}
