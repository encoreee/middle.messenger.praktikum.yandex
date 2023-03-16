import Block from '../../utils/Block';
import { PropsWithRouter, withRouter } from '../../utils/withRouter';

interface LinkLabelProps extends PropsWithRouter {
  label: string;
  to: string;
  events?: {
    click: () => void
  },
}

export class LinkLabelBase extends Block<LinkLabelProps> {
  constructor(props: LinkLabelProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const LinkLabelWithRouter = withRouter(LinkLabelBase);
