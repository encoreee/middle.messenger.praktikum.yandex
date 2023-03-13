import Block from '../../utils/Block';
import template from './userDataPage.hbs';
import * as styles from './styles.module.pcss';
import { NameLabel } from '../../components/NameLabel';
import { TitleLabel } from './../../components/TitleLable/index';
import { UserDataField } from './../../components/UserDataField/index';
import { User } from '../../contracts/auth';
import { withStore } from '../../utils/withStore';

interface UserDataPageProps {
  user: User;
}

interface Mapper {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

const mapper: Mapper = {
  first_name: 'Имя',
  second_name: 'Фамилия',
  login: 'Имя пользователя',
  email: 'Почта',
  password: 'Пароль',
  phone: 'Телефон',
};

export class UserDataPageBase extends Block<UserDataPageProps> {
  constructor(props: UserDataPageProps) {
    super({ ...props });
  }

  init() {
    this.children.name = new NameLabel({
      name: this.props.user.first_name,
    });

    this.children.pageTitle = new TitleLabel({
      label: 'Данные пользователя',
    });

    let mapperKeys = Object.keys(mapper);
    let fields: Block<any>[] = [];
    Object.entries(this.props.user).forEach(([key, value]) => {
      if (mapperKeys.includes(key)) {
        fields.push(
          new UserDataField({
            key: mapper[key as keyof typeof mapper],
            value: value,
          })
        );
      }
    });

    this.children.dataFields = fields;
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
export const UserDataPage = withUser(UserDataPageBase);
