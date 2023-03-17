/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import Block from '../../utils/Block';
import template from './changeDataPage.hbs';
import * as styles from './styles.module.pcss';
import { NameLabel } from '../../components/NameLabel';
import { TitleLabel } from '../../components/TitleLable/index';
import { ChangeDataForm } from '../../components/ChangeDataForm/index';
import { AvatarImage } from '../../components/AvatarImage';
import { User } from '../../contracts/auth';
import { withStore } from '../../utils/withStore';
import router from '../../utils/Router';
import { Routes } from '../..';

interface ChangeDataPageProps {
  user: User;
}

class ChangeDataPageBase extends Block<ChangeDataPageProps> {
  constructor(props: ChangeDataPageProps) {
    super({ ...props });
  }

  init() {
    this.children.name = new NameLabel({
      name: this.props.user.display_name,
    });

    this.children.pageTitle = new TitleLabel({
      label: 'Изменение данных',
    });

    this.children.changeDataForm = new ChangeDataForm({ ...this.props });
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

const withUser = withStore((state) => ({
  user: state.user || {},
}));

export const ChangeDataPage = withUser(ChangeDataPageBase);
