export interface NotOk {
  error: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
}

export type Users = User[];
