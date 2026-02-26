import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import TasksView from './components/TasksView'
import CalendarView from './components/CalendarView'
import ActivityFeed from './components/ActivityFeed'
import NewsView from './components/NewsView'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('timeline')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-gray-100 overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentTime={currentTime} />
        
        <main className="flex-1 overflow-auto p-6">
          {activeView === 'timeline' && <ActivityFeed />}
          {activeView === 'tasks' && <TasksView />}
          {activeView === 'calendar' && <CalendarView />}
          {activeView === 'news' && <NewsView />}
        </main>
      </div>
    </div>
  )
}

export default App
