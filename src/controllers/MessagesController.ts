/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable class-methods-use-this */
import dayjs from 'dayjs';
import { Message } from '../contracts/message';
import { Storage } from '../utils/Storage';
import WSTransport from '../utils/WSTransport';

export enum WSTransportEvents {
  Connected = 'connected',
  Error = 'error',
  MessageEvent = 'message',
  Close = 'close',
}

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this.sockets.has(id)) {
      return;
    }

    const userId = Storage.getState().user.id;

    const wsTransport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`,
    );

    this.sockets.set(id, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, id);
    this.fetchOldMessages(id);
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  private onMessage(id: number, messages: Message | Message[]) {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (Storage.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    const sortMes = messagesToAdd.sort((m1, m2) => {
      const dt1 = dayjs(m1.time);
      const dt2 = dayjs(m2.time);
      if (dt1 < dt2) {
        return 1;
      }

      if (dt1 > dt2) {
        return -1;
      }

      return 0;
    });

    Storage.set(`messages.${id}`, sortMes);
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.MessageEvent, (message) =>
      this.onMessage(id, message),
    );
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

const controller = new MessagesController();

export default controller;
