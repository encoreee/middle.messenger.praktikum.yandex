import Block from '../../../utils/Block';
import template from './myUserAreaAvatar.hbs';
import * as styles from './styles.module.pcss';

interface MyUserAvatarProps {
  events?: {
    click: (event: Event) => void;
  };
}

export class MyUserAreaAvatar extends Block<MyUserAvatarProps> {
  constructor(props: MyUserAvatarProps) {
    super({ ...props });
  }

  init() {}

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
