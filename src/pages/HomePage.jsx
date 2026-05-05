import { useState, useEffect } from "react"
import api from "../services/habits-service"
import { RingLoader } from "react-spinners"



function HomePage() {
  
  const [habits, setHabits] = useState([])
  const [completions, setCompletions] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] =useState(false)
  

  function fetchHabits() {
    setLoading(true);
    api
      .get("/habits")
      .then((response) => {
        setHabits(response.data)
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
        setCompletions(response.data)
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
      progress: 0
    }
    api.post("/completions", completionToSend)
    .then(() => {
      fetchCompletions()
    })
    .catch(() => {
      setError("Something went wrong")
    })
  }

  useEffect(() => {
    fetchHabits()
    fetchCompletions()
  }, []);
  
    return (
   <div>
      {error && <h1>{error}</h1>}
      {loading ? (
        <RingLoader />
      ) : (
        habits
          .map((habit) => (
            <div key={habit.id}>{habit.name}
            <button onClick={() => handleComplete(habit.id)}>Completed</button>
            </div>
          ))
      )}
      
    </div>
  );
  
}
export default HomePage