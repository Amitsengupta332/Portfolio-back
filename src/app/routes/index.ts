import { Router } from 'express';
import { blogRoutes } from '../modules/blog/blog.routes';
import { projectsRoutes } from '../modules/project/project.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/project',
    route: projectsRoutes,
  },
  {
    path: '/blog',
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
