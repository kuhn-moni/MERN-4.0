import { Sports_activity } from "../@types";

interface ActivityViewProps {
  activityProps: Sports_activity;
}

const ActivityView = ({ activityProps }: ActivityViewProps) => {
  const { organiser, participants, activity, duration, date, _id } = activityProps;
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between mb-3">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", gap: 10, border: "solid 2px", width: "15rem" }}>
        <p>Activitiy</p>
        <span>Organiser: {organiser.username}</span>
        <>
          <p>Participants:</p>
          <ul>
            {participants.map((participant, idx) => (
              <li key={idx}>{participant.username && participant.email}</li>
            ))}
          </ul>
        </>
        <p>Activity: {activity}</p>
        <p>Duration: {duration}</p>
        <p>Date: {date}</p>
      </div>
    </div>
  );
};

export default ActivityView;
