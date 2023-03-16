/* eslint-disable class-methods-use-this */
import API, { ChatsAPI } from '../api/ChatsAPI';
import { Storage } from '../utils/Store';
import MessagesController from './MessagesController';

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

      await MessagesController.connect(chat.id, token);
    });

    Storage.set('usersData', usersData);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
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
