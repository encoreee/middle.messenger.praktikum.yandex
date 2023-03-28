/* eslint-disable class-methods-use-this */
import API, { ChatsAPI } from '../api/ChatsAPI';
import { User } from '../contracts/auth';
import { Storage } from '../utils/Storage';
import MessagesController from './MessagesController';
import { set } from '../utils/helpers';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    const usersData = await this.api.read();
    usersData.map(async (chat) => {
      const token = await this.getToken(chat.id);
      const users = await this.getChatUsers(chat.id);

      const userId = Storage.getState().user.id;
      const opponent = users.filter((u) => u.id !== userId)[0];
      if (opponent) {
        set(chat, 'avatarPers', opponent.avatar);
      }
      await MessagesController.connect(chat.id, token);
    });

    Storage.set('usersData', usersData);
  }

  async fetchSelectedChatUsers(id: number) {
    const chatUsers = await this.api.getUsers(id);

    Storage.set('chatUsers', chatUsers);
  }

  async getChatUsers(id: number): Promise<User[]> {
    const users = await this.api.getUsers(id);
    return users;
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  delete(id: number) {
    this.api.delete(id);
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    Storage.set('selectedChat', id);
  }
}

const controller = new ChatsController();

// @ts-ignore
window.chatsController = controller;

export default controller;
