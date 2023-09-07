// import React, { useContext } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
// import { AuthContext } from "../context/AuthContext";
import { User, Sports_activity } from "../@types";

interface CalendarHeatmapModalProps {
  onClose: () => void;
  user: User;
}

interface dataObjectFull {
  date: string;
  count: Sports_activity[];
}

interface dataObject {
  date: string;
  count: number[];
}

const CalendarHeatmapModal: React.FC<CalendarHeatmapModalProps> = ({ onClose, user }) => {
  //   const { user } = useContext(AuthContext);

  // Generate heatmap data
  const year = new Date().getFullYear();
  console.log(year);
  const startDate = new Date("01/01/" + year);
  console.log(startDate);
  const endDate = new Date(new Date("12/31/" + year).setHours(23, 59, 59));
  console.log(endDate);
  const data = generateHeatmapData(user);
  console.log("dates", startDate, endDate);

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={data}
          classForValue={(value) => {
            if (value && value.count > 0) {
              return `color-scale-${value.count}`;
            }
            return "color-empty";
          }}
        />
      </div>
    </div>
  );
};

// Helper function to generate heatmap data
function generateHeatmapData(user: User) {
  const data: dataObjectFull[] = [];
  user.sports_activities.forEach((sa, x) => {
    console.log(sa);
    if (data.length === 0 && x === 0) {
      const newObject = { date: sa.date, count: [sa] };
      data.push(newObject);
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].date === sa.date) {
        data[i].count.push(sa);
        console.log(true);
      } else {
        const newObject = { date: sa.date, count: [sa] };
        data.push(newObject);
        console.log(false);
      }
    }
    console.log("data", data);
  });
  //   const currentDate = new Date(startDate);
  //   while (currentDate <= endDate) {
  //     const count = isUserParticipantOrOrganizer(currentDate, user) ? 4 : 0;
  //     data.push({ date: currentDate, count });
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  return data;
}

// Helper function to check if the user is a participant or organizer on a given date
function isUserParticipantOrOrganizer(date: Date, user: User) {
  return user.sports_activities.some((activity: Sports_activity) => {
    const activityDate = new Date(activity.date);
    return activityDate.toDateString() === date.toDateString();
  });
}

export default CalendarHeatmapModal;
