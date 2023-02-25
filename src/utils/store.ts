import Block from "./Block";

export interface State {
  curPage?: Block;
}

export class Store  {
  private state: State = {curPage : undefined};

  public getState() {
    return this.state;
  }

  public setCurPage(page : Block) {
    return this.state.curPage = page;
  }
}

const store = new Store();

export default store;

