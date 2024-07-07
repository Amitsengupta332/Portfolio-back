import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { projectService } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const result = await projectService.createProject(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Project added successfully',
    data: result,
  });
});

const getProject = catchAsync(async (req, res) => {
  const result = await projectService.getProject(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Project fetched successfully!',
    data: result,
  });
});

const getProjects = catchAsync(async (req, res) => {
  const result = await projectService.getProjects();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects fetched successfully!',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const result = await projectService.updateProject(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully!',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const result = await projectService.deleteProject(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project deleted successfully!',
    data: result,
  });
});

export const projectController = {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject,
};
