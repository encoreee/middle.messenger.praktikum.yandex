/* eslint-disable import/no-named-as-default */
import BlockConstructable from './Block';

import store, { State, StoreEvents } from './Store';

export function withStore<SP extends Partial<Record<string, any>>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof BlockConstructable<Record<string, any>>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
