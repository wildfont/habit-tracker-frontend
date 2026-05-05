import { useState } from "react";
import api from "../services/habits-service";

function HabitForm({ fetchHabits }) {
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    category: "",
    frequency: "",
    goal: "",
  });
  const [error, setError] = useState(null);

  function handleChange(e) {
    setNewHabit({ ...newHabit, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    const habitToSend = {
      ...newHabit,
      createdAt: new Date().toISOString().slice(0, 10),
      color: "#fd79a8",
      icon: "📋",
    };
    api
      .post("/habits", habitToSend)
      .then(() => {
        setNewHabit({
          name: "",
          description: "",
          category: "",
          frequency: "",
          goal: "",
        });
        fetchHabits();
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>New Habit</h1>
      <input
        type="text"
        placeholder="Habit name"
        name="name"
        value={newHabit.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Habit description"
        name="description"
        value={newHabit.description}
        onChange={handleChange}
      />
      <select
        name="category"
        value={newHabit.category}
        onChange={handleChange}
        id=""
      >
        <option value="">Select a category</option>
        <option value="Study">Study</option>
        <option value="Health">Health</option>
        <option value="Wellness">Wellness</option>
        <option value="Personal">Personal</option>
      </select>
      <select
        name="frequency"
        value={newHabit.frequency}
        onChange={handleChange}
        id=""
      >
        <option value="">Select frequency</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <input
        type="number"
        placeholder="e.g. 30 min, 8 glasses..."
        name="goal"
        value={newHabit.goal}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
export default HabitForm;
