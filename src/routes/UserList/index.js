import { injectReducer } from '../../store/reducers';
import container from './containers/UserListContainer';
import reducer from './modules/userList';

export default store => ({
  path: 'userList',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Add the reducer to the store on key 'counter'  */
    injectReducer(store, { key: 'userList', reducer });

    /*  Return getComponent   */
    cb(null, container);
  },
});
