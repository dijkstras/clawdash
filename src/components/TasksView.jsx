import { useState } from 'react'

const initialTasks = {
  todo: [
    { 
      id: 1, 
      title: 'Meeting met design team', 
      desc: 'Bespreken van de nieuwe feature set voor Q2',
      labels: [{ text: 'Work', color: 'blue' }, { text: 'Urgent', color: 'red' }],
      progress: 0,
      status: 'pending'
    },
    { 
      id: 2, 
      title: 'Granola dashboard afmaken', 
      desc: 'Integratie met Notion API voor meeting notes',
      labels: [{ text: 'Dev', color: 'purple' }],
      progress: 25,
      status: 'pending'
    },
  ],
  inprogress: [
    { 
      id: 3, 
      title: 'Hockey Floortje', 
      desc: 'Woensdag 15:15 - 16:15',
      labels: [{ text: 'Kids', color: 'green' }, { text: 'Sport', color: 'orange' }],
      progress: 50,
      status: 'active'
    },
  ],
  review: [
    { 
      id: 4, 
      title: 'Zangles Floortje vrijdag', 
      desc: '17:45 - 18:30',
      labels: [{ text: 'Kids', color: 'green' }, { text: 'Music', color: 'pink' }],
      progress: 90,
      status: 'review'
    },
  ],
  done: [
    { 
      id: 5, 
      title: 'Dashboard v1.0 live', 
      desc: 'Eerste versie succesvol gedeployed',
      labels: [{ text: 'Done', color: 'gray' }],
      progress: 100,
      status: 'approved'
    },
  ]
}

const labelColors = {
  blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  green: 'bg-green-500/20 text-green-300 border-green-500/30',
  orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  red: 'bg-red-500/20 text-red-300 border-red-500/30',
  pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  gray: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
}

export default function TasksView() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')

  const columns = [
    { id: 'todo', title: 'Te doen', count: tasks.todo.length },
    { id: 'inprogress', title: 'Bezig', count: tasks.inprogress.length },
    { id: 'review', title: 'Review', count: tasks.review.length },
    { id: 'done', title: 'Klaar', count: tasks.done.length },
  ]

  const approveTask = (taskId, columnId) => {
    // Future: approval logic
    console.log('Approved:', taskId)
  }

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">✅ Taken</h2>
        
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors">
          + Nieuwe taak
        </button>
      </div>

      {/* Add Task Input */}
      <div className="bg-[#13131a] rounded-xl p-4 border border-gray-800 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Wat moet er gedaan worden?"
            className="flex-1 bg-[#1a1a23] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium transition-colors">
            Toevoegen
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-[#13131a] rounded-xl p-4">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">{column.title}</span>
                <span className="w-6 h-6 rounded-full bg-gray-800 text-xs flex items-center justify-center text-gray-400">
                  {column.count}
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {tasks[column.id].map((task) => (
                <div 
                  key={task.id}
                  className="bg-[#1a1a23] rounded-xl p-4 border border-gray-800 hover:border-purple-500/50 transition-all group"
                >
                  {/* Labels */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {task.labels.map((label, i) => (
                      <span 
                        key={i}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${labelColors[label.color]}`}
                      >
                        {label.text}
                      </span>
                    ))}
                  </div>

                  {/* Title & Desc */}
                  <h4 className="font-medium text-white mb-1">{task.title}</h4>
                  <p className="text-sm text-gray-500 mb-4">{task.desc}</p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Voortgang</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {task.status === 'review' && (
                      <>
                        <button 
                          onClick={() => approveTask(task.id, column.id)}
                          className="flex-1 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-sm font-medium transition-colors"
                        >
                          ✓ Goedkeuren
                        </button>
                        <button className="flex-1 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
                        >
                          ✗ Afkeuren
                        </button>
                      </>
                    )}
                    {task.status !== 'review' && (
                      <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                        Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
