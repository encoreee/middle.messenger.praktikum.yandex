import Block from '../../utils/Block';
import template from './myUserArea.hbs';
import * as styles from './styles.module.pcss';
import router from '../../utils/Router';
import { Routes } from '../..';
import { AvatarImage } from '../AvatarImage';
import { withStore } from '../../utils/withStore';
import { User } from '../../contracts/auth';

interface MyUserAreaProps {
  user : User
}

export class MyUserAreaBase extends Block<MyUserAreaProps> {
  constructor(props: MyUserAreaProps) {
    super({ ...props });
  }

  init() {

    this.children.avatar = new AvatarImage({
      path: this.props.user.avatar,
      events: {
        click: () => {
          router.go(Routes.Profile);
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}


const withUser = withStore((state) => {
  return {
    user: state.user || {},
  };
});

// @ts-ignore
export const MyUserArea = withUser(MyUserAreaBase);


