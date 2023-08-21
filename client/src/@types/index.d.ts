export interface NotOk {
  error: string;
}

export interface sports_activities {
  _id: string;
  organiser: string;
  participant: string;
  activity: string;
  duration: string;
  date: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  profile_pic: string;
  sports_activities: sports_activities[];
}

export type Users = User[];
