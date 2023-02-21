import Block from '../../utils/Block';
import template from './userArea.hbs';
import styles from './styles.module.pcss';

interface UsersAreaProps {

}

export class UsersArea extends Block<UsersAreaProps> {
  constructor(props: UsersAreaProps) {
    super({...props });
  }

  init() {
  }


  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
