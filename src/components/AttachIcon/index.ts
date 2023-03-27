import Block from '../../utils/Block';
import template from './attachIcon.hbs';
import * as styles from './styles.module.pcss';
import attach from '../../../static/attach.svg';

interface AttachIconProps {}

export class AttachIcon extends Block<AttachIconProps> {
  constructor(props: AttachIconProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { attach, styles });
  }
}
