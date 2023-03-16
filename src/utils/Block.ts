/* eslint-disable class-methods-use-this */
import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

export interface BlockConstructable<P extends Record<string, any>> {
  new (props: P): Block<P>;
}

// Нельзя создавать экземпляр данного класса

class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  protected props: P;

  public children: Record<string, Block | Block[]>;

  private eventBus: () => EventBus;

  private elementPrivate: HTMLElement | null = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsWithChildren: P) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this.makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  getChildrenAndProps(childrenAndProps: P): {
    props: P;
    children: Record<string, Block | Block[]>;
  } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((v) => v instanceof Block)
      ) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  addEvents() {
    const { events = {} } = this.props as P & {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this.elementPrivate?.addEventListener(eventName, events[eventName]);
    });
  }

  removeEvents(eventBus: EventBus) {
    eventBus.off(Block.EVENTS.INIT, this.initPrivate.bind(this));
    eventBus.off(
      Block.EVENTS.FLOW_CDM,
      this.componentDidMountPrivate.bind(this),
    );
    eventBus.off(
      Block.EVENTS.FLOW_CDU,
      this.componentDidUpdatePrivate.bind(this),
    );
    eventBus.off(Block.EVENTS.FLOW_RENDER, this.renderPrivate.bind(this));
  }

  registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.initPrivate.bind(this));
    eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this.componentDidMountPrivate.bind(this),
    );
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this.componentDidUpdatePrivate.bind(this),
    );
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.renderPrivate.bind(this));
  }

  private initPrivate() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  componentDidUnmountPrivate() {
    this.componentDidUnmount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.componentDidUnmountPrivate());
      } else {
        child.componentDidUnmountPrivate();
      }
    });
  }

  public componentDidUnmount() {}

  componentDidMountPrivate() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidUnmount() {
    this.componentDidUnmount();
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private componentDidUpdatePrivate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this.elementPrivate;
  }

  private renderPrivate() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.elementPrivate && newElement) {
      this.elementPrivate.replaceWith(newElement);
    }

    this.elementPrivate = newElement;

    this.addEvents();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(
          (child) => `<div data-id="${child.id}"></div>`,
        );
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  makePropsProxy(props: P) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };

        // eslint-disable-next-line no-param-reassign
        target[prop as keyof P] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }
}

export default Block;
