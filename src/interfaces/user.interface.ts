export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type ICreateUser = Omit<IUser, 'id' | 'isActive'>;
