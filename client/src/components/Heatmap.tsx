
import { HeatMapGrid } from 'react-grid-heatmap'
import { generateY } from '../utils/generate-y-cells';
import { DataListList } from '../@types';

function Heatmap() {
  const me = {
    name: "me",
    activities: [
      { organiser: "user123", activity: "swimming", date: "Mon Aug 28 2023 17:30:00" },
      { organiser: "user123", activity: "swimming", date: "Tue Aug 29 2023 17:30:00" },
      { organiser: "user123", activity: "swimming", date: "Wed Aug 30 2023 17:30:00" },
      { organiser: "user123", activity: "swimming", date: "Thu Aug 31 2023 17:30:00" },
      { organiser: "user123", activity: "swimming", date: "Fri Sep 01 2023 17:30:00" },
      { organiser: "user123", activity: "yoga", date: "Tue Aug 29 2023 18:30:00" },
      { organiser: "user123", activity: "yoga", date: "Thu Aug 31 2023 18:30:00" },
      { organiser: "user123", activity: "basketball", date: "Wed Aug 30 2023 18:30:00" },
      { organiser: "user123", activity: "tennis", date: "Sat Sep 02 2023 10:00:00" },
      { organiser: "user123", activity: "climbing", date: "Sat Sep 02 2023 12:30:00" },
  ]}
  const friend1 = {
    name: "Moni",
    activities: [
      { organiser: "user123", activity: "swimming", date: "Tue Aug 29 2023 17:30:00" },
      { organiser: "user123", activity: "swimming", date: "Wed Aug 30 2023 17:30:00" },
      { organiser: "user123", activity: "swimming", date: "Thu Aug 31 2023 17:30:00" },
      { organiser: "user123", activity: "swimming", date: "Fri Sep 01 2023 17:30:00" },
      { organiser: "user123", activity: "yoga", date: "Tue Aug 29 2023 18:30:00" },
      { organiser: "user123", activity: "yoga", date: "Thu Aug 31 2023 18:30:00" },
      { organiser: "user123", activity: "basketball", date: "Wed Aug 30 2023 18:30:00" },
      { organiser: "user123", activity: "tennis", date: "Sat Sep 02 2023 10:00:00" },
      { organiser: "user123", activity: "climbing", date: "Sat Sep 02 2023 12:30:00" },
      { organiser: "user123", activity: "tai chi", date: "Fri Sep 01 2023 18:30:00" },
      { organiser: "user123", activity: "cycling", date: "Sat Sep 02 2023 14:30:00" },
      { organiser: "user123", activity: "meditation", date: "Sun Sep 03 2023 08:30:00" },
  ]}
  const users = [me, friend1];

  const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const yLabels: string[] = [];
  const usersActivities: DataListList = [];

  users.forEach((user) => {
    const userInfo = generateY(user);
    usersActivities.push(userInfo.activityList);
    yLabels.push(userInfo.yLabel);
  })
  console.log(yLabels)
  console.log(usersActivities);

  const data = new Array(yLabels.length)
  .fill(0)
  .map((_, i) =>
    new Array(xLabels.length)
      .fill(0)
      .map((_, j) => {
        console.log(usersActivities[i][j].length)
        return usersActivities[i][j].length
      })
  );
  console.log(data)

  return (
    <div>
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        cellRender={(x, y, value) => {
          if (usersActivities[x][y].length === 0) {
            return <div title={"No activities today"}>{value}</div>
          } else {
            let title = "Today you have ";
            usersActivities[x][y].forEach((a, i) => {
              i === 0 ? title = title + a.activity : title = title + ` & ${a.activity}`
            })
            return <div title={title}>{value}</div>
          }
          
        }}
        xLabelsStyle={() => ({
          fontSize: ".65rem",
          textTransform: "uppercase",
        })}
        yLabelsStyle={() => ({
          fontSize: ".65rem",
          color: "#777"
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: ".7rem",
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
        })}
        cellHeight="1.5rem"
        xLabelsPos="top"
        onClick={(x, y) => {
          alert(`Clicked (${x}, ${y})`);
          console.log(usersActivities[x][y])
        }}
        // yLabelsPos="right"
        // square
      />
    </div>
  )
}

export default Heatmap