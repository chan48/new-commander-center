// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout';
import Home from './Home';
import Counter from './Counter';
import SignUp from './SignUp';
import LogIn from './LogIn';
import VerifyEmail from './VerifyEmail';

const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    Counter(store),
    SignUp(store),
    LogIn(store),
    VerifyEmail(store),
  ],
});

export default createRoutes;
