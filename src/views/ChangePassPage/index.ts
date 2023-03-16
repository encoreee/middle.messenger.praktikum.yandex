import Block from '../../utils/Block';
import template from './changePassPage.hbs';
import * as styles from './styles.module.pcss';
import { NameLabel } from '../../components/NameLabel';
import { TitleLabel } from '../../components/TitleLable/index';
import { ChangePassForm } from './../../components/ChangePassForm/index';
import { AvatarImage } from '../../components/AvatarImage';
import { withStore } from '../../utils/withStore';
import { User } from '../../contracts/auth';
import router from '../../utils/Router';
import { Routes } from '../..';


interface ChangePassPageProps extends Record<string, any> {
  user: User 
}


class ChangePassPageBase extends Block<ChangePassPageProps> {
  constructor(props : ChangePassPageProps ) {
    super({...props});
  }

  init() {
    this.children.name = new NameLabel({
      name: this.props.user.display_name,
    });

    this.children.pageTitle = new TitleLabel({
      label: 'Изменение пароля',
    });

    this.children.changeDataForm = new ChangePassForm({});

    this.children.avatar = new AvatarImage({
      path: this.props.user.avatar,
      events: {
        click: () => {
          router.go(Routes.Profile);
        },
      },
    });
  }

  onSubmit() {}

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => {
  return {
    user: state.user || {},
  };
});

export const ChangePassPage = withUser(ChangePassPageBase);

