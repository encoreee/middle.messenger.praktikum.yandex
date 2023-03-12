import Block from '../../utils/Block';
import template from './userArea.hbs';
import * as styles from './styles.module.pcss';
import { UserCell } from '../UserCell';
import { withStore } from '../../utils/withStore';
import { UserInfo } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';

interface UsersAreaProps {
  usersData: UserInfo[];
  isLoaded: boolean;
}


class UsersAreaBase extends Block<UsersAreaProps> {
  constructor(props: UsersAreaProps) {
    super({ ...props });
  }

  init() {
    this.children.userCells = this.createUserCells(this.props);
  }

  private createUserCells (props: UsersAreaProps) {
    return props.usersData.map(data => {
      return new UserCell({
        id : data.id,
        name : data.title,
        message : data.last_message.content,
        time : data.last_message.time,
        messageCount : data.unread_count,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          }
        }
      });
    })
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ usersData: [...(state.usersData || [])] }));

//@ts-ignore
export const UsersArea = withChats(UsersAreaBase);
