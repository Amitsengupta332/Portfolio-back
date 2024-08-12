import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema<TProject>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    technologyUsed: { type: String, required: true },
    frontEndRepo: { type: String, required: true },
    backEndRepo: { type: String, required: true },
    liveLink: { type: String },
    images: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Project = model<TProject>('Project', projectSchema);
