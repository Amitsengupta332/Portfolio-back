import { Router } from 'express';
import { blogRoutes } from '../modules/blog/blog.routes';

const router = Router();

const moduleRoutes = [
  // {
  //     path: '/auth',
  //     route: AuthRoutes,
  //   },
  //   {
  //     path: '/project',
  //     route: ProjectRoutes,
  //   },
  {
    path: '/blog',
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
