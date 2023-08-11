/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, FormEvent } from "react";
import { NotOk, User, Users } from "../@types";

function CreateUserForm({
  setUsers,
  users,
}: {
  users: Users;
  setUsers: React.Dispatch<React.SetStateAction<Users>>;
}) {
  const baseURL = import.meta.env.VITE_SERVER_BASE as string;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    urlencoded.append("username", username);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(`${baseURL}api/users/new`, requestOptions);
      console.log(response);
      if (response.ok) {
        const result = (await response.json()) as User;
        alert("user created!");
        setUsers([...users, { ...result }]);
      } else {
        const result = (await response.json()) as NotOk;
        alert(result.error);
      }
    } catch (e) {
      console.log(e);
      const { message } = e as Error;
      alert(message);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, username, password });
    await createUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new User:</h3>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <input
        type="username"
        value={username}
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <button>Create!</button>
    </form>
  );
}

export default CreateUserForm;
