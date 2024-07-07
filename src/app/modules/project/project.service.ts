import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TProject } from './project.interface';
import { Project } from './project.model';

const createProject = async (project: TProject) => {
  const result = await Project.create(project);
  return result;
};

const getProjects = async () => {
  const projects = await Project.find();
  return projects;
};

const getProject = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found!');
  }
  return project;
};

const updateProject = async (id: string, project: TProject) => {
  await getProject(id);
  const updatedProject = await Project.findByIdAndUpdate(id, project, {
    new: true,
  });
  return updatedProject;
};
const deleteProject = async (id: string) => {
  const project = await getProject(id);
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, 'Project not found!');
  }
  await Project.findByIdAndDelete(id);
  return { message: 'Project deleted successfully' };
};

// const deleteProject = async (id: string) => {
//   await getProject(id);
//   await Project.findByIdAndDelete(id);
//   return { message: 'Project deleted successfully!' };
// };
export const projectService = {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject,
};
