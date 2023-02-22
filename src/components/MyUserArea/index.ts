import Block from '../../utils/Block';
import template from './myUserArea.hbs';
import * as styles from './styles.module.pcss';

interface MyUserAreaProps {

}

export class MyUserArea extends Block<MyUserAreaProps> {
  constructor(props: MyUserAreaProps) {
    super({...props });
  }

  init() {
  }


  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
