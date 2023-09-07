import { useState, FormEvent, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import ActivityView from "../components/ActivityView";
import { Sports_activity, User } from "../@types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarHeatmapModal from "../components/CalendarHeatMapModal";

const CreateActivityForm = () => {
  const { user } = useContext(AuthContext);
  const [participants, setParticipants] = useState<User[]>([]);
  const [userToFind, setUserToFind] = useState("");
  const [activities, setActivities] = useState<Sports_activity[]>([]);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [showModal, setShowModal] = useState(false);

  const createActivity = async () => {
    const activityData = {
      organiser: user?._id,
      participants: participants,
      activity,
      duration,
      date: date?.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }),
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

  const handleRemoveParticipant = (participant: User) => {
    setParticipants(participants.filter((p) => p._id !== participant._id));
  };

  const FindUser = async () => {
    console.log(userToFind);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE}api/users/email/${userToFind}`);
      if (!res.ok) alert("No user");
      else {
        const result = (await res.json()) as User;
        setParticipants([...participants, result]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleOpenModal}
        >
          View Heatmap
        </button>
      </div>
      {showModal && user && <CalendarHeatmapModal user={user} onClose={() => setShowModal(false)} />}

      <label>
        Participants:
        <input type="text" value={userToFind} onChange={(e) => setUserToFind(e.target.value)} />
      </label>
      <button onClick={FindUser}>Find User</button>
      <ul>
        {participants.map((p) => (
          <li key={p._id}>
            {p.username}
            <button onClick={() => handleRemoveParticipant(p)}>Remove</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h3>Create new Activity:</h3>
        <br />

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
          <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yy" />
        </label>
        <br />
        <button type="submit">Create!</button>
      </form>

      {activities && activities.map((activity, idx) => <ActivityView key={idx} activityProps={activity} />)}
    </div>
  );
};

export default CreateActivityForm;
