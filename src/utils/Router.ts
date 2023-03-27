/* eslint-disable import/no-cycle */
import Block from './Block';
import { Route } from './Route';

export interface BlockConstructable<P = any> {
  new (props: P): Block<Record<string, any>>;
}

export class Router {
  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    this.routes = [];
  }

  public use(pathname: string, block: BlockConstructable) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this.onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this.onRoute(target.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#app');
