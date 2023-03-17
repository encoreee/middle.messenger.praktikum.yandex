import { UserInfo } from '../api/ChatsAPI';
import { User } from '../contracts/auth';
import { Message } from '../contracts/message';

export enum StoreEvents {
  Updated = 'updated',
}

export interface State {
  user: User;
  usersData: UserInfo[];
  chatUsers: User[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
}
