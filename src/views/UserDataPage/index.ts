import Block from '../../utils/Block';
import template from './userDataPage.hbs';
import * as styles from './styles.module.pcss';
import { NameLabel } from '../../components/NameLabel';
import { TitleLabel } from './../../components/TitleLable/index';
import { UserDataField } from './../../components/UserDataField/index';

interface UserDataSample {
  key: string;
  value: string;
}

let userData: UserDataSample[] = [];

userData.push({
  key: 'Имя пользователя',
  value: 'AlexR'
});

userData.push({
  key: 'Почта',
  value: 'alexraykov200@gmail.com'
});

userData.push({
  key: 'Имя',
  value: 'Алекандр'
});

userData.push({
  key: 'Фамилия',
  value: 'Райков'
});

userData.push({
  key: 'Телефон',
  value: '+7 (981) 433-44-62'
});



export class UserDataPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.name = new NameLabel({
      name: 'Александр',
    });

    this.children.pageTitle = new TitleLabel({
      label: 'Данные пользователя',
    });

    this.children.dataFields = userData.map((dataField) => {
      return new UserDataField({
        key : dataField.key,
        value : dataField.value,
    
      });
    });

  }

  onSubmit() {}

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
