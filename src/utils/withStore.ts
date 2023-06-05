/* eslint-disable import/no-named-as-default */
import { Storage } from './Storage';
import BlockConstructable from './Block';
import { State, StoreEvents } from './StoreTypes';

export function withStore<SP extends Partial<Record<string, any>>>(
  mapStateToProps: (state: State) => SP,
): any {
  return function wrap<P>(
    Component: typeof BlockConstructable<Record<string, any>>,
  ) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(Storage.getState());

        super({ ...(props as P), ...previousState });

        Storage.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(Storage.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
