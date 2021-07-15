export interface IProjectsAll {
  id?: number;
  projects: any;
  slides: any;
  cases: any;
  userId: number;
  createdAt?: Date;
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
