/* eslint-disable new-cap */
/* eslint-disable import/no-cycle */
import Block from './Block';
import { BlockConstructable } from './Router';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

export class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly blockClass: BlockConstructable,
    private readonly query: string,
  ) {}

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block);
    }
  }
}
