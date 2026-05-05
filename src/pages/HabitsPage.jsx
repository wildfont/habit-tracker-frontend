import { useState, useEffect } from "react"
import api from "../services/habits-service"
import HabitForm from "../components/HabitForm"
import { Link } from "react-router-dom"




function HabitsPage() {

  const [habits, setHabits] = useState([])

  function fetchHabits() {
    api.get("/habits")
  .then((response) => setHabits(response.data))    
  }

  function handleDelete(id){
    api.delete("/habits/"+id)
    .then(()=>{
      fetchHabits()
    })
  }

  useEffect(()=>{ 
  fetchHabits()
  },[])
  
  return (
    <div>
      {habits.map((habit) => (
       <div key={habit.id}>
        <Link to={"/habits/"+ habit.id}>{habit.name}</Link>
        <button onClick={() => handleDelete(habit.id)}>Delete</button>
        </div>
    ))} 
    <HabitForm fetchHabits={fetchHabits}/>
     </div>
  )
   

    
}
export default HabitsPage