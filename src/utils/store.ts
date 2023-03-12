import { set } from './helpers';
import { EventBus } from './EventBus';
import { User } from '../contracts/auth';
import { UserInfo } from '../api/ChatsAPI';
import { Message } from '../controllers/MessagesController';

export enum StoreEvents {
  Updated = 'updated',
}

export interface State {
  user: User;
  usersData: UserInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

// @ts-ignore
window.store = store;

export default store;
