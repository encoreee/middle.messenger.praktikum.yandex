import Block from '../../utils/Block';
import template from './changeDataPage.hbs';
import * as styles from './styles.module.pcss';
import { NameLabel } from '../../components/NameLabel';
import { TitleLabel } from '../../components/TitleLable/index';
import { ChangeDataForm } from './../../components/ChangeDataForm/index';
import { AvatarImage } from '../../components/AvatarImage';
import { User } from '../../contracts/auth';
import { withStore } from '../../utils/withStore';

interface ChangeDataPageProps {
  user: User;
}


 class ChangeDataPageBase extends Block<ChangeDataPageProps> {
  constructor(props : ChangeDataPageProps) {
    super({...props});
  }

  init() {
    this.children.name = new NameLabel({
      name: this.props.user.display_name,
    });

    this.children.pageTitle = new TitleLabel({
      label: 'Изменение данных',
    });

    this.children.changeDataForm = new ChangeDataForm({});
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
export const ChangeDataPage = withUser(ChangeDataPageBase);


