"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const Route_1 = require("./Route");
class Router {
    constructor(rootQuery) {
        this.rootQuery = rootQuery;
        this.routes = [];
        this.currentRoute = null;
        this.history = window.history;
        this.routes = [];
    }
    use(pathname, block) {
        const route = new Route_1.Route(pathname, block, this.rootQuery);
        this.routes.push(route);
        return this;
    }
    go(pathname) {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }
    back() {
        this.history.back();
    }
    forward() {
        this.history.forward();
    }
    start() {
        window.onpopstate = (event) => {
            const target = event.currentTarget;
            this.onRoute(target.location.pathname);
        };
        this.onRoute(window.location.pathname);
    }
    onRoute(pathname) {
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
    getRoute(pathname) {
        return this.routes.find((route) => route.match(pathname));
    }
}
exports.Router = Router;
exports.default = new Router('#app');
//# sourceMappingURL=Router.js.map