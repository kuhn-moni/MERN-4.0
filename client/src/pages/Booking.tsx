import { useState, FormEvent } from "react";

const CreateActivityForm = () => {
  const [organiser, setOrganiser] = useState("");
  const [participants, setParticipants] = useState("");
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const createActivity = async () => {
    const activityData = {
      organiser,
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
        setOrganiser("");
        setParticipants("");
        setActivity("");
        setDuration("");
        setDate("");
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create activity");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createActivity();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new Activity:</h3>
      <label>
        Organiser:
        <input type="text" value={organiser} onChange={(e) => setOrganiser(e.target.value)} />
      </label>
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
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create!</button>
    </form>
  );
};

export default CreateActivityForm;
