import Block from '../../utils/Block';
import template from './avatarField.hbs';
import * as styles from './styles.module.pcss';

interface AvatarFieldProps {
  name : string
}

export class AvatarField extends Block<AvatarFieldProps> {
  constructor(props: AvatarFieldProps) {
    super({ ...props });
  }

  init() {}
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
