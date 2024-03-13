import { SignIn, SignUp, ForgotPassword } from '@view/auth';
import Drugs from '@view/admin/drugs';
import DetailDrug from '@view/admin/drugs/Detail';
import Dashboard from '@view/admin/dashboard';
import Users from '@view/admin/users';
import DetailUser from '@view/admin/users/Detail';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '', element: Dashboard, layout: 'admin' },
  { path: '/drugs', element: Drugs, layout: 'admin' },
  { path: '/drugs/insert', element: DetailDrug, layout: 'admin' },
  { path: '/drugs/detail/:_id', element: DetailDrug, layout: 'admin' },

  { path: '/users', element: Users, layout: 'admin' },
  { path: '/users/insert', element: DetailUser, layout: 'admin' },
  { path: '/users/detail/:_id', element: DetailUser, layout: 'admin' },
];

export default routes;
