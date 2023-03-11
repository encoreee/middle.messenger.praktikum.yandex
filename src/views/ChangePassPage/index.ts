import Block from '../../utils/Block';
import template from './changePassPage.hbs';
import * as styles from './styles.module.pcss';
import { NameLabel } from '../../components/NameLabel';
import { TitleLabel } from '../../components/TitleLable/index';
import { AvatarField } from '../../components/AvatarField/index';
import { ChangePassForm } from './../../components/ChangePassForm/index';

export class ChangePassPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.name = new NameLabel({
      name: 'Александр',
    });

    this.children.pageTitle = new TitleLabel({
      label: 'Изменение пароля',
    });

    this.children.changeDataForm = new ChangePassForm({});
    this.children.avatar = new AvatarField({name : 'avatar'});
  }

  onSubmit() {}

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
