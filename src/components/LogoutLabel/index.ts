/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import Block from '../../utils/Block';
import { PropsWithRouter, withRouter } from '../../utils/withRouter';
import template from './linkLabel.hbs';
import styles from './styles.module.pcss';
import AuthController from '../../controllers/authController';

interface LogoutLabelBaseProps extends PropsWithRouter {
  label: string;
  to: string;
  events?: {
    click: () => void;
  };
}

class LogoutLabelBase extends Block<LogoutLabelBaseProps> {
  constructor(props: LogoutLabelBaseProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    AuthController.logout();
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const LogoutLabel = withRouter(LogoutLabelBase);
