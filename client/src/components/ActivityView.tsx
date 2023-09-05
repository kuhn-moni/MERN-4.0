import { Sports_activity, User } from "../@types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface ActivityViewProps {
  activityProps: Sports_activity;
}

const ActivityView = ({ activityProps }: ActivityViewProps) => {
  const { organiser, participants, activity, duration, date } = activityProps;
  const { user } = useContext(AuthContext);

  const isCreatedByCurrentUser = user && organiser._id === user._id;

  return (
    <div className={`d-flex flex-row flex-wrap justify-content-between mb-3 ${isCreatedByCurrentUser ? "green-tick" : ""}`}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", gap: 10, border: "solid 2px", width: "15rem", flex: "0 0 33%" }}
      >
        <p>Activity</p>
        <span>Organiser: {organiser.username}</span>
        <>
          <p>Participants:</p>
          <ul>
            {participants.map((participant: User, idx: number) => (
              <li key={idx}>{(participant as User).username && (participant as User).email}</li>
            ))}
          </ul>
        </>
        <p>Activity: {activity}</p>
        <p>Duration: {duration}</p>
        <p>Date: {date}</p>
        {isCreatedByCurrentUser && <div className="green-tick">✓</div>}
      </div>
    </div>
  );
};

export default ActivityView;
