import Block from '../../utils/Block';
import template from './changePassPage.hbs';
import * as styles from './styles.module.pcss';
import { NameLabel } from '../../components/NameLabel';
import { TitleLabel } from '../../components/TitleLable/index';
import { ChangePassForm } from './../../components/ChangePassForm/index';
import { AvatarImage } from '../../components/AvatarImage';
import { withStore } from '../../utils/withStore';
import { User } from '../../contracts/auth';

interface ChangePassPageProps {
  user: User;
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

// @ts-ignore
export const ChangePassPage = withUser(ChangePassPageBase);

