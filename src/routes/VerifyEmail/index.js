import { injectReducer } from '../../store/reducers';
import container from './containers/VerifyEmailContainer';
import reducer from './modules/verifyEmail';

export default store => ({
  path: 'verifyEmail',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Add the reducer to the store on key 'counter'  */
    injectReducer(store, { key: 'verifyEmail', reducer });

    /*  Return getComponent   */
    cb(null, container);
  },
});
