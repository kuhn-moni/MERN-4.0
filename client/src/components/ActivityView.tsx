import { Sports_activity } from "../@types";

interface ActivityViewProps {
  activityProps: Sports_activity;
}

const ActivityView = ({ activityProps }: ActivityViewProps) => {
  const { organiser, participants, activity, duration, date, _id } = activityProps;
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 30 }}>
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
  );
};

export default ActivityView;
