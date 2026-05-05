import { useState, useEffect } from "react"
import api from "../services/habits-service"
import HabitForm from "../components/HabitForm"
import { Link } from "react-router-dom"




function HabitsPage() {

  const [habits, setHabits] = useState([])
  const [search,setSearch] = useState("")
  const [showNewHabit, setShowNewHabit] = useState(false)


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
      <input type="text" placeholder="🔎 Search habits" name="name" value={search} onChange={(e) => setSearch(e.target.value)}/>


      {habits.filter((habit) => habit.name.toLowerCase().includes(search.toLowerCase())).map((habit) => (
       <div key={habit.id}>
        <Link to={"/habits/"+ habit.id}>{habit.name}</Link>
        <button onClick={() => handleDelete(habit.id)}>Delete</button>
        </div>
    ))} 
    <button onClick={() => setShowNewHabit((!showNewHabit))}>{showNewHabit ? "Cancel" : "New Habit"}
    </button>
      {showNewHabit && <HabitForm fetchHabits={fetchHabits}/>}

    
     </div>
  )
   

    
}
export default HabitsPage