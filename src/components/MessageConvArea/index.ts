import Block from '../../utils/Block';
import template from './messageConvArea.hbs';
import styles from './styles.module.pcss';
import { MyMessage } from './../MyMessage/index';

interface MessageConvAreaProps {}

interface Message {
  text: string;
  time: string;
}

let messageData: Message[] = [];

messageData.push({
  text: `Роджерс первым ввел в научный обиход понятие «клиент»,
  так как идентификация понимает гомеостаз в силу которого смешивает
  субъективное и объективное, переносит свои внутренние побуждения
  на реальные связи вещей`,
  time: '13:44',
});
messageData.push({
  text: ` Элемент <big> (от англ. big — большой) увеличивает размер шрифта на единицу по сравнению с
  обычным текстом. В HTML размер шрифта измеряется в условных единицах от 1 до 7, средний размер текста, используемый
  по умолчанию, принят 3. Таким образом, добавление <big> увеличивает текст на одну условную единицу.`,
  time: '12:34',
});

export class MessageConvArea extends Block<MessageConvAreaProps> {
  constructor(props: MessageConvAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.messages = messageData.map((message) => {
      return new MyMessage({
        text: message.text,
        time: message.time,
      });
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
