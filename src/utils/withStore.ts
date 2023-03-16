/* eslint-disable import/no-named-as-default */
import { storage } from './Store';
import BlockConstructable from './Block';
import { State, StoreEvents } from './StoreTypes';

export function withStore<SP extends Partial<Record<string, any>>>(
  mapStateToProps: (state: State) => SP,
) {
  return function wrap<P>(
    Component: typeof BlockConstructable<Record<string, any>>,
  ) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(storage.getState());

        super({ ...(props as P), ...previousState });

        storage.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(storage.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
