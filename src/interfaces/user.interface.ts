export interface IUser {
  id: number;
  fullName: string;
  password: string;
  salt: string;
  projects: any[];
  createdAt: Date;
}
