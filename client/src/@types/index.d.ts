export interface NotOk {
  error: string;
}

export interface sports_activities {
  _id: string;
  organiser: string;
  participants: string | User;
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

interface Activity {
  organiser: string,
  activity: string,
  date: string
}

type Activities = Activity[]

type DataList = Activities[]

type DataListList = DataList[]

type Data = number[][]

interface TestUser {
  name: string,
  activities: Activities
}

type UserInfoArray = { yLabel: string, activityList: DataList }[]
