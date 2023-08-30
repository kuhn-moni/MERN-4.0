import { useState } from "react";

const Booking = () => {
  const [organiser, setOrganiser] = useState("");
  const [participants, setParticipants] = useState([]);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const activityData = {
      organiser,
      participants,
      activity,
      duration,
      date,
    };

    // Send the form data to the server or perform any other desired action
    console.log(activityData);

    // Reset the form fields
    setOrganiser("");
    setParticipants([]);
    setActivity("");
    setDuration("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Organiser:
        <input type="text" value={organiser} onChange={(e) => setOrganiser(e.target.value)} />
      </label>
      <br />
      <label>
        Participants:
        <input type="text" value={participants} onChange={(e) => setParticipants(e.target.value.split(","))} />
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Booking;
