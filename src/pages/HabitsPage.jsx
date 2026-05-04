import { useState, useEffect } from "react"
import api from "../services/habits-service"
import HabitForm from "./HabitForm"




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
        <p >{habit.name}</p>
        <button onClick={() => handleDelete(habit.id)}>Delete</button>
        </div>
    ))} 
    <HabitForm fetchHabits={fetchHabits}/>
     </div>
  )
   

    
}
export default HabitsPage