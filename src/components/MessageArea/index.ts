import Block from '../../utils/Block';
import template from './messageArea.hbs';
import * as styles from './styles.module.pcss';
import { NotSelectedLabel } from './../NotSelectedLabel';
import { MessageUserArea } from './../MessageUserArea/index';
import { MessageConvArea } from '../MessageConvArea';
import { MessageInputArea } from './../MessageInputArea/index';

interface MessageAreaProps {}

export interface Message {
  text: string;
  time: string;
  isMy: boolean;
}

let messageData: Message[] = [];

messageData.push({
  text: `Роджерс первым ввел в научный обиход понятие «клиент»,
  так как идентификация понимает гомеостаз в силу которого смешивает
  субъективное и объективное, переносит свои внутренние побуждения
  на реальные связи вещей`,
  time: '13:44',
  isMy: false,
});
messageData.push({
  text: ` Элемент <big> (от англ. big — большой) увеличивает размер шрифта на единицу по сравнению с
  обычным текстом. В HTML размер шрифта измеряется в условных единицах от 1 до 7, средний размер текста, используемый
  по умолчанию, принят 3. Таким образом, добавление <big> увеличивает текст на одну условную единицу.`,
  time: '12:34',
  isMy: false,
});
messageData.push({
  text: `Спасибо!`,
  time: '12:34',
  isMy: true,
});

export class MessageArea extends Block<MessageAreaProps> {
  constructor(props: MessageAreaProps) {
    super({ ...props });
  }

  init() {
    // this.children.notSelectedLabel = new NotSelectedLabel({
    //   label: 'Выберите чат...',
    // });

    this.children.messageUserArea = new MessageUserArea({});

    this.children.messageConvArea = new MessageConvArea({
      messages: messageData,
    });

    this.children.messageInputArea = new MessageInputArea({});
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
