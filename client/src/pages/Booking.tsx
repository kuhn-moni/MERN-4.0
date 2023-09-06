import { useState, FormEvent, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

import { User } from "../@types";
import Heatmap from "../components/Heatmap";

const CreateActivityForm = () => {
  //   const [organiser, setOrganiser] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const [participants, setParticipants] = useState<User[]>([]);

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

  const [userToFind, setUserToFind] = useState("");

  const findUser = async() => {
    //check first that the email typed in input isn't already in the array
    if (participants.some((p) => p.email === userToFind)) return alert("User already participating")
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE}api/users/email/${userToFind}`);
      if (!response.ok) return alert("No user could be found :(");
      const result = await response.json() as User;
      setParticipants([...participants, result]);
    } catch (e) {
      console.log(e)
    }
  }

  const removeParticipant = (participant: User) => {
    //create new array of all participants except one to remove
    const filtered = participants.filter((p) => p._id !== participant._id);
    setParticipants(filtered);
  }

  const resetFields = () => {
    setParticipants([]);
    setActivity("");
    setDuration("");
    setDate("");
    setUserToFind("");
  }

  const createActivity = async () => {
    const activityData = {
      organiser: user?._id,
      participants,
      activity,
      duration,
      date: date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }),
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
        setUser(result.user);
        resetFields();
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
<>
    <>
      <h3>Create new Activity:</h3>
      <label>
        Participants:
        <input type="text" value={userToFind} placeholder="Type someone's email" onChange={(e) => setUserToFind(e.target.value)} />
        <button onClick={findUser}>Add User</button>
      </label>
      { participants.length === 0 ? <p>No participants</p> :
        <ul>
          { participants.map((p) => {
            return (
              <li key={p._id+"par"}>
                {p.username} {" "}
                <button onClick={() => removeParticipant(p)}>X</button>
              </li>
          )}) }
        </ul>
      }

    <form onSubmit={handleSubmit}>
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
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create!</button>
    </form>
    { user && <Heatmap />}
    </>

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
          <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yy" />
        </label>
        <br />
        <button type="submit">Create!</button>
      </form>

      {activities && activities.map((activity, idx) => <ActivityView key={idx} activityProps={activity} />)}
    </div>
</>
  );
};

export default CreateActivityForm;
