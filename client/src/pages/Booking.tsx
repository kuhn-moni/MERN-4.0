import { useState, FormEvent, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import ActivityView from "../components/ActivityView";
import { Sports_activity } from "../@types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateActivityForm = () => {
  const { user } = useContext(AuthContext);
  const [participants, setParticipants] = useState([]);
  const [activities, setActivities] = useState<Sports_activity[]>([]);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());

  const createActivity = async () => {
    const activityData = {
      organiser: user?._id,
      participants: participants,
      activity,
      duration,
      date,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE}api/activities/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activityData),
      });
      if (response.ok) {
        const result = await response.json();
        alert("Activity created!");
        console.log(result);
        setActivity("");
        setDuration("");
        setDate(new Date());
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create activity");
    }
  };

  const fetchActivities = async () => {
    try {
      const requestOptions = {
        method: "GET",
      };

      const response = await fetch("http://localhost:5000/api/activities/all", requestOptions);
      const result = await response.json();
      setActivities(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createActivity();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 30 }}>
      <form onSubmit={handleSubmit}>
        <h3>Create new Activity:</h3>
        <br />
        <label>
          Participants:
          <input type="text" value={participants} onChange={(e) => setParticipants(e.target.value)} />
        </label>
        <br />
        <label>
          Activity:
          <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} />
        </label>
        <br />
        <label>
          Duration:
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </label>
        <br />
        <label>
          Date:
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </label>
        <br />
        <button type="submit">Create!</button>
      </form>

      {activities && activities.map((activity, idx) => <ActivityView key={idx} activityProps={activity} />)}
    </div>
  );
};

export default CreateActivityForm;
