import Block, { BlockConstructable } from '../utils/Block';
import Router from '../utils/Router';

export function withRouter<P extends Record<string, any>>(Component: BlockConstructable<P>) {
 
  type Props = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  }
}

export interface PropsWithRouter {
  router: typeof Router;
}
