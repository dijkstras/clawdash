import { useState } from 'react'

const initialTasks = {
  todo: [
    { 
      id: 1, 
      title: 'Meeting met design team', 
      desc: 'Bespreken van de nieuwe feature set voor Q2',
      labels: [{ text: 'Work', color: 'blue' }, { text: 'Urgent', color: 'red' }],
      progress: 0,
      members: ['SD'],
      comments: 3,
      attachments: 2
    },
    { 
      id: 2, 
      title: 'Granola dashboard afmaken', 
      desc: 'Integratie met Notion API voor meeting notes',
      labels: [{ text: 'Dev', color: 'purple' }],
      progress: 25,
      members: ['SD', 'AI'],
      comments: 5,
      attachments: 1
    },
  ],
  progress: [
    { 
      id: 3, 
      title: 'Hockey Floortje', 
      desc: 'Woensdag 15:15 - 16:15',
      labels: [{ text: 'Kids', color: 'green' }, { text: 'Sport', color: 'orange' }],
      progress: 50,
      members: ['F'],
      comments: 0,
      attachments: 0
    },
    { 
      id: 4, 
      title: 'Review pull requests', 
      desc: 'Frontend team PRs nakijken',
      labels: [{ text: 'Code', color: 'blue' }],
      progress: 75,
      members: ['SD'],
      comments: 8,
      attachments: 0
    },
  ],
  review: [
    { 
      id: 5, 
      title: 'Zangles Floortje vrijdag', 
      desc: '17:45 - 18:30',
      labels: [{ text: 'Kids', color: 'green' }, { text: 'Music', color: 'pink' }],
      progress: 90,
      members: ['F'],
      comments: 1,
      attachments: 0
    },
  ],
  done: [
    { 
      id: 6, 
      title: 'Dashboard v1.0 live', 
      desc: 'Eerste versie succesvol gedeployed',
      labels: [{ text: 'Done', color: 'gray' }],
      progress: 100,
      members: ['SD', 'AI'],
      comments: 12,
      attachments: 3
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

const progressColors = {
  0: 'bg-red-500',
  25: 'bg-orange-500',
  50: 'bg-yellow-500',
  75: 'bg-blue-500',
  100: 'bg-green-500',
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks)
  const [activeTab, setActiveTab] = useState('board')

  const columns = [
    { id: 'todo', title: 'To do', count: tasks.todo.length, color: 'gray' },
    { id: 'progress', title: 'In progress', count: tasks.progress.length, color: 'purple' },
    { id: 'review', title: 'Review', count: tasks.review.length, color: 'blue' },
    { id: 'done', title: 'Done', count: tasks.done.length, color: 'green' },
  ]

  return (
    <div className="h-full">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 bg-[#13131a] p-1 rounded-lg">
          {['Overview', 'Backlog', 'Timeline', 'Activities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.toLowerCase()
                  ? 'text-purple-400 bg-purple-500/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#13131a] border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-purple-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
      </div>

      {/* Board */}
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
              <button className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {tasks[column.id].map((task) => (
                <div 
                  key={task.id}
                  className="bg-[#1a1a23] rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all cursor-pointer group"
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
                  <h4 className="font-medium text-white mb-1 group-hover:text-purple-400 transition-colors">
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.desc}</p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${progressColors[task.progress] || 'bg-purple-500'}`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    {/* Avatars */}
                    <div className="flex -space-x-2">
                      {task.members.map((member, i) => (
                        <div 
                          key={i}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold border-2 border-[#1a1a23]"
                        >
                          {member}
                        </div>
                      ))}
                      {task.members.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs border-2 border-[#1a1a23]">
                          +{task.members.length - 3}
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        {task.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        {task.attachments}
                      </span>
                    </div>
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
