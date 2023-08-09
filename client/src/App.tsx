import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Users } from "./@types";

function App() {
  const [count, setCount] = useState(0);
  // console.log(import.meta.env.VITE_SERVER_BASE);
  const [users, setUsers] = useState<Users>([]);
  console.log(import.meta.env.VITE_SERVER_BASE);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE}api/users/all`
        );
        const result = await response.json();
        setUsers(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers().catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
