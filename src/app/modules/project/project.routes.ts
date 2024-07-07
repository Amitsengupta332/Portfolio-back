import express from 'express';
import { projectController } from './project.controller';

const router = express.Router();

router.post('/createProject', projectController.createProject);

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export const projectsRoutes = router;
