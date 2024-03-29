import Block from '../../utils/Block';
import template from './avatarImage.hbs';
import * as styles from './styles.module.pcss';
import { resorcesPrefix } from '../../api/Prefixis';

interface AvatarImageProps {
  path: string;
  events?: {
    click: (event: Event) => void;
  };
}

export class AvatarImage extends Block<AvatarImageProps> {
  constructor(props: AvatarImageProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props, resorcesPrefix, styles });
  }
}
