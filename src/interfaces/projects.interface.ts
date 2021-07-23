import { IUser } from './user.interface';

export interface IProject {
  id?: number;
  name: string;
  activityStatus: string;
  slides: any;
  cases: any;
  users: IUser[];
  createdAt?: Date;
  userId?: number;
}
export interface IProjectData {
  projects: any;
  selectedProject: any;
  activeColor: string;
}
export interface IProjectsInfo {
  userId: number;
  projectData: IProjectData;
}
export interface ISimpleProjectsInfo {
  project: IProject;
}
