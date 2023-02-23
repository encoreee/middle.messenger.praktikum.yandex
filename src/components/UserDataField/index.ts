import Block from '../../utils/Block';
import template from './userDataField.hbs';
import * as styles from './styles.module.pcss';

interface UserDataFieldProps {
  key: string;
  value: string;
}

export class UserDataField extends Block<UserDataFieldProps> {
  constructor(props: UserDataFieldProps) {
    super({...props });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
