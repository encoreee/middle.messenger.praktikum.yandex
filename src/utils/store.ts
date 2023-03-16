import { set } from './helpers';
import { EventBus } from './EventBus';
import { StoreEvents } from './StoreTypes';

class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

export const storage = new Store();
