import Block from '../../utils/Block';
import template from './changeDataPage.hbs';
import * as styles from './styles.module.pcss';
import { NameLabel } from '../../components/NameLabel';
import { TitleLabel } from '../../components/TitleLable/index';
import { ChangeDataForm } from './../../components/ChangeDataForm/index';
import { AvatarField } from './../../components/AvatarField/index';

export class ChangeDataPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.name = new NameLabel({
      name: 'Александр',
    });

    this.children.pageTitle = new TitleLabel({
      label: 'Изменение данных',
    });

    this.children.changeDataForm = new ChangeDataForm({});
    this.children.avatar = new AvatarField({name : 'avatar'});
  }

  onSubmit() {}

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
