/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import Block from '../../utils/Block';
import template from './userDataPage.hbs';
import * as styles from './styles.module.pcss';
import { NameLabel } from '../../components/NameLabel';
import { TitleLabel } from '../../components/TitleLable/index';
import { UserDataField } from '../../components/UserDataField/index';
import { User } from '../../contracts/auth';
import { withStore } from '../../utils/withStore';
import { LinkLabelWithRouter } from '../../components/LinkLabel';
import { FileInput } from '../../components/FileInput/index';
import { SingupFormButton } from '../../components/SingupFormButton';
import UserController from '../../controllers/userController';
import { resorcesPrefix } from '../../api/Prefixis';
import { AvatarImage } from '../../components/AvatarImage';
import { LogoutLabel } from '../../components/LogoutLabel/index';
import router from '../../utils/Router';
import { Routes } from '../..';

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

class UserDataPageBase extends Block<UserDataPageProps> {
  constructor(props: UserDataPageProps) {
    super({ ...props });
  }

  init() {
    this.children.name = new NameLabel({
      name: this.props.user.first_name,
    });

    this.children.avatar = new AvatarImage({
      path: this.props.user.avatar,
      events: {
        click: () => {
          router.go(Routes.Messenger);
        },
      },
    });

    this.children.pageTitle = new TitleLabel({
      label: 'Данные пользователя',
    });

    const mapperKeys = Object.keys(mapper);
    const fields: Block<any>[] = [];
    Object.entries(this.props.user).forEach(([key, value]) => {
      if (mapperKeys.includes(key)) {
        fields.push(
          new UserDataField({
            key: mapper[key as keyof typeof mapper],
            value,
          }),
        );
      }
    });

    this.children.dataFields = fields;

    this.children.fileInput = new FileInput({
      id: 'avatar',
      name: 'avatar',
    });

    this.children.submitAvatarButton = new SingupFormButton({
      label: 'Загрузть',
      type: 'Submit',
      events: {
        click: (event) => {
          event.preventDefault();
          this.onSubmit();
        },
      },
    });

    this.children.changeDataLink = new LinkLabelWithRouter({
      label: 'Изменить данные',
      to: '/changedata',
    });

    this.children.changePassLink = new LinkLabelWithRouter({
      label: 'Изменить пароль',
      to: '/changepass',
    });

    this.children.changePassLink = new LinkLabelWithRouter({
      label: 'Изменить пароль',
      to: '/changepass',
    });

    this.children.logoutLink = new LogoutLabel({
      label: 'Выйти',
      to: '/',
    });
  }

  protected componentDidUpdate(newProps: UserDataPageProps): boolean {
    this.children.avatar = new AvatarImage({
      path: newProps.user.avatar,
      events: {
        click: () => {
          router.go(Routes.Messenger);
        },
      },
    });
    return true;
  }

  onSubmit() {
    const fileInput = Object.values(this.children).filter(
      (child) => child instanceof FileInput,
    )[0] as FileInput;

    const input = fileInput.element as HTMLInputElement;

    const file = input.files?.item(0);

    const formData = new FormData();

    formData.append('avatar', file as Blob);

    UserController.changeAvatar(formData as FormData);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      resorcesPrefix,
      ...this.props.user,
      styles,
    });
  }
}

const withUser = withStore((state) => ({
  user: state.user || {},
}));

export const UserDataPage = withUser(UserDataPageBase);
