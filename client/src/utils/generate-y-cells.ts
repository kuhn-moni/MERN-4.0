import { Data, DataList, TestUser } from "../@types";


const generateY = (user: TestUser) => {
  const activityList: DataList = [[], [], [], [], [], [], []];
  user.activities.forEach((a) => {
    const day = a.date.slice(0,3);
    switch (day) {
      case "Mon": activityList[0].push(a);
      break;
      case "Tue": activityList[1].push(a);
      break;
      case "Wed": activityList[2].push(a);
      break;
      case "Thu": activityList[3].push(a);
      break;
      case "Fri": activityList[4].push(a);
      break;
      case "Sat": activityList[5].push(a);
      break;
      case "Sun": activityList[6].push(a);
      break;
    }
  })
  const data: Data = [[]];
  activityList.forEach((a) => {
    data[0].push(a.length);
  })
  return {
    yLabel: user.name,
    activityList: activityList
  }
}

export { generateY }