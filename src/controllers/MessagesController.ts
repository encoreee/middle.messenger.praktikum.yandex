import store from '../utils/Store';

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}

class MessagesController {
 // private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {

  }

  sendMessage(id: number, message: string) {

  }

  fetchOldMessages(id: number) {

  }

  closeAll() {

  }

  private onMessage(id: number, messages: Message | Message[]) {
    let messagesToAdd: Message[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${id}`, messagesToAdd);
  }

  private onClose(id: number) {

  }

}


const controller = new MessagesController();

// @ts-ignore
window.messagesController = controller;

export default controller;
