import './App.css'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HabitsPage from './pages/HabitsPage'
import HabitsDetailPage from './pages/HabitsDetailPage'
import StatsPage from './pages/StatsPage'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/habits" element={<HabitsPage/>}/>
      <Route path="/habits/:id" element={<HabitsDetailPage/>}/>
      <Route path="/stats" element={<StatsPage/>}/>
    </Routes>
    </>
  )
}

export default App
