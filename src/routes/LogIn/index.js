import { injectReducer } from '../../store/reducers';
import container from './containers/LogInContainer';
import reducer from './modules/logIn';

export default store => ({
  path: 'logIn',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Add the reducer to the store on key 'counter'  */
    injectReducer(store, { key: 'logIn', reducer });

    /*  Return getComponent   */
    cb(null, container);
  },
});
