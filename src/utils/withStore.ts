/* eslint-disable import/no-named-as-default */
import storage, { State, StoreEvents } from './Store';
import BlockConstructable from './Block';

export function withStore<SP extends Partial<Record<string, any>>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof BlockConstructable<Record<string, any>>) {
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
