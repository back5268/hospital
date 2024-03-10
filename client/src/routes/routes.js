import { SignIn, SignUp, ForgotPassword } from '@view/auth';
import { Courses, Users, Dashboard, DetailCourse } from '@view/admin';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '', element: Dashboard, layout: 'admin' },
  { path: '/courses', element: Courses, layout: 'admin' },
  { path: '/courses/insert', element: DetailCourse, layout: 'admin' },
  { path: '/courses/detail/:_id', element: DetailCourse, layout: 'admin' },
  { path: '/users', element: Users, layout: 'admin' }
];

export default routes;
