import { useState, useEffect } from "react";
import api from "../services/habits-service";
import { RingLoader } from "react-spinners";

function HomePage() {
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  function fetchHabits() {
    setLoading(true);
    api
      .get("/habits")
      .then((response) => {
        setHabits(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong");
      });
  }

  function fetchCompletions() {
    setLoading(true);
    api
      .get("/completions")
      .then((response) => {
        setCompletions(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong");
      });
  }

  function handleComplete(id) {
    const completionToSend = {
      habitId: id,
      date: new Date().toISOString().slice(0, 10),
      completed: true,
      notes: "",
      rating: 0,
      progress: 0,
    };
    api
      .post("/completions", completionToSend)
      .then(() => {
        fetchCompletions();
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }

  function handleUnComplete(habitId) {
    const completion = completions.find(
      (c) => c.habitId === habitId && c.date === today,
    );

    api.delete("/completions/" + completion.id).then(fetchCompletions);
  }

  useEffect(() => {
    fetchHabits();
    fetchCompletions();
  }, []);

  return (
    <div>
      {error && <h1>{error}</h1>}
      {loading ? (
        <RingLoader />
      ) : (
        habits.map((habit) => (
          <div key={habit.id}>
            {habit.name}
            {completions.some(
              (completion) =>
                completion.habitId === habit.id && completion.date === today,
            ) ? (
              <button onClick={() => handleUnComplete(habit.id)}>⬜️</button>
            ) : (
              <button onClick={() => handleComplete(habit.id)}>✅</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
export default HomePage;
