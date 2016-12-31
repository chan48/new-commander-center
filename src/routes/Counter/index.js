import { injectReducer } from '../../store/reducers';
import Counter from './containers/CounterContainer';
import reducer from './modules/counter';

export default store => ({
  path: 'counter',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Add the reducer to the store on key 'counter'  */
    injectReducer(store, { key: 'counter', reducer });

    /*  Return getComponent   */
    cb(null, Counter);
  },
});
