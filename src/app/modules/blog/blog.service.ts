import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getBlogById = async (id: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog was not found');
  }
  return blog;
};

const getBlogs = async () => {
  const blogs = await Blog.find();
  return blogs;
};

const updateBlog = async (id: string, blog: TBlog) => {
  const blogExist = await Blog.findById(id);
  if (!blogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blogs not found');
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  return updatedBlog;
};

const deleteBlog = async (id: string) => {
  const blog = await getBlogById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }
  await Blog.findByIdAndDelete(id);
  return { message: 'Blog deleted successfully' };
};

// const deleteBlog = async (id: string) => {
//   const blogExist = await Blog.findById;
//   if (!blogExist) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
//   }
//   await Blog.findByIdAndDelete(id);
//   return { message: 'Blog deleted successfully' };
// };

export const blogServices = {
  createBlog,
  getBlogById,
  getBlogs,
  updateBlog,
  deleteBlog,
};
