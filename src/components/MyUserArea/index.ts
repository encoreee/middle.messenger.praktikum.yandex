import Block from '../../utils/Block';
import template from './myUserArea.hbs';
import * as styles from './styles.module.pcss';
import { MyUserAreaAvatar } from './MyUserAreaAvatar/index';

interface MyUserAreaProps {
}

export class MyUserArea extends Block<MyUserAreaProps> {
  constructor(props: MyUserAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.avatar = new MyUserAreaAvatar({
      events: {
        click: (event) => {
          
          
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
