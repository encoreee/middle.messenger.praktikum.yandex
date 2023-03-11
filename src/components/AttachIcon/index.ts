import Block from '../../utils/Block';
import template from './attachIcon.hbs';
import * as styles from './styles.module.pcss';

interface AttachIconProps {}

export class AttachIcon extends Block<AttachIconProps> {
  constructor(props: AttachIconProps) {
    super({ ...props });
  }

  init() {}
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
