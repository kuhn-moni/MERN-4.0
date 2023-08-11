import { useEffect, useState } from "react";
import "./App.css";
import { NotOk, Users } from "./@types";
import CreateUserForm from "./components/UserCard";
import UserCard from "./components/CreatedUserFrom";

function App() {
  // const [count, setCount] = useState(0);
  // console.log(import.meta.env.VITE_SERVER_BASE);
  const [users, setUsers] = useState<Users>([]);

  console.log(import.meta.env.VITE_SERVER_BASE);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE}api/users/all`
        );
        if (response.ok) {
          const result = await response.json();
          setUsers(result);
          console.log(result);
        } else {
          const result = (await response.json()) as NotOk;
          alert(result.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers().catch((e) => console.log(e));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <h1>Nike Training Club</h1>
      {users.length === 0 ? (
        <p>No Users 😞</p>
      ) : (
        <>
          <h2>Current users:</h2>
          {users.map((u) => {
            return <UserCard key={u._id} user={u} />;
          })}
        </>
      )}
      <CreateUserForm setUsers={setUsers} users={users} />
    </div>
  );
}

export default App;
