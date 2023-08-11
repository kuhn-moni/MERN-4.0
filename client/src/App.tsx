import { useEffect, useState } from "react";
import "./App.css";
import { NotOk, Users } from "./@types";
import CreateUserForm from "./components/CreatedUserFrom";
import UserCard from "./components/UserCard";

function App() {
  const [users, setUsers] = useState<Users>([]);

  console.log(import.meta.env.VITE_SERVER_BASE);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE}api/users/all`
        );
        if (response.ok) {
          const result = (await response.json()) as Users;
          setUsers(result);
          console.log(result);
        } else {
          const result = (await response.json()) as NotOk;
          alert(result.error);
        }
      } catch (error) {
        console.log(error);
        const { message } = error as Error;
        alert(message);
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
