export interface IProjectsAll {
  id?: number;
  projects: { key: string };
  slides: { key: string };
  cases: { key: string };
  userId: number;
  createdAt?: Date;
}
