import express from 'express';
import { blogController } from './blog.controller';

const router = express.Router();

router.post('/createBlog', blogController.createBlog);
router.get('/', blogController.getBlogs);

router.get('/:id', blogController.getBlogById);
router.put('/:id', blogController.updateBlog);

router.delete('/:id', blogController.deleteBlog);

export const blogRoutes = router;
