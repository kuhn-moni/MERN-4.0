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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const createUser = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    if (avatarFile) {
      formData.append("image", avatarFile);
    }
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE}api/users/new`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as User;
        alert("user created!");
        setUsers([...users, { ...result }]);
        setEmail("");
        setUsername("");
        setPassword("");
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
      <input
        type="file"
        onChange={(e) => {
          e.target.files && setAvatarFile(e.target.files[0]);
        }}
      />
      <button>Create!</button>
    </form>
  );
}

export default CreateUserForm;
