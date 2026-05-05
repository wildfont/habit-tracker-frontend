import { useState, useEffect } from "react";
import api from "../services/habits-service";
import HabitForm from "../components/HabitForm";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState("");
  const [showNewHabit, setShowNewHabit] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  function handleDelete(id) {
    api
      .delete("/habits/" + id)
      .then(() => {
        fetchHabits();
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="🔎 Search habits"
        name="name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        name="category"
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
        id=""
      >
        <option value="">All categories</option>
        <option value="Study">Study</option>
        <option value="Health">Health</option>
        <option value="Wellness">Wellness</option>
        <option value="Personal">Personal</option>
      </select>
      {error && <h1>{error}</h1>}
      {loading ? (
        <RingLoader />
      ) : (
        habits
          .filter((habit) =>
            habit.name.toLowerCase().includes(search.toLowerCase()),
          )
          .filter((habit) =>
            searchCategory ? habit.category === searchCategory : true,
          )
          .map((habit) => (
            <div key={habit.id}>
              <Link to={"/habits/" + habit.id}>{habit.name}</Link>
              <button onClick={() => handleDelete(habit.id)}>Delete</button>
            </div>
          ))
      )}
      <button onClick={() => setShowNewHabit(!showNewHabit)}>
        {showNewHabit ? "Cancel" : "New Habit"}
      </button>
      {showNewHabit && <HabitForm fetchHabits={fetchHabits} />}
    </div>
  );
}

export default HabitsPage;
