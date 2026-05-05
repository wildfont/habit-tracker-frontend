import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/habits-service";
import HabitEditForm from "../components/HabitEditForm";

function HabitsDetailPage() {
  const { id } = useParams();
  const [habitDetails, setHabitDetails] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/habits/" + id)
      .then((response) => setHabitDetails(response.data))
      .catch(() => {
        setError("Something went wrong");
      });
  }, []);
  return (
    <div>
      {error && <p>{error}</p>}
      {habitDetails && (
        <div>
          <h2>{habitDetails.name}</h2>
          <p>{habitDetails.description}</p>
          <h6>{habitDetails.category}</h6>
          <h6>{habitDetails.frequency}</h6>
          <h6>{habitDetails.goal}</h6>
          <h6>{habitDetails.icon}</h6>
          <button onClick={() => setShowEditForm(!showEditForm)}>
            {showEditForm ? "Cancel" : "Modify"}
          </button>
          {showEditForm && (
            <HabitEditForm
              habitDetails={habitDetails}
              setHabitDetails={setHabitDetails}
              id={id}
            />
          )}
        </div>
      )}
    </div>
  );
}
export default HabitsDetailPage;
