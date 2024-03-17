import "./App.css";
import { useState, useEffect } from "react";
import Status from "./components/Status";
import Post from "./components/Post";

function App() {
  const [serverData, setServerData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
      const data = await response.text(); // Extract the text from the response
      setServerData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Status />
      <Post />
      <h1>Data from Server:</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>{serverData}</p>
      )}
    </div>
  );
}

export default App;
