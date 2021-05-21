export interface IUser {
  id: number;
  fullName: string;
  password: string;
  salt: string;
  createdAt: Date;
}