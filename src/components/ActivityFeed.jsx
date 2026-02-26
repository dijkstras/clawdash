import { useState, useEffect } from 'react'

const activities = [
  { id: 1, time: '10:15', text: 'Dashboard project gestart', type: 'system', icon: '🚀' },
  { id: 2, time: '10:24', text: 'React + Vite geconfigureerd', type: 'code', icon: '⚛️' },
  { id: 3, time: '10:30', text: 'Tailwind CSS toegevoegd', type: 'code', icon: '🎨' },
  { id: 4, time: '11:13', text: 'Layout componenten gebouwd', type: 'code', icon: '📐' },
  { id: 5, time: '11:15', text: 'Wacht op feedback van Sjoerd', type: 'waiting', icon: '⏳' },
]

const typeColors = {
  system: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  code: 'bg-green-500/20 text-green-300 border-green-500/30',
  waiting: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  error: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export default function ActivityFeed() {
  const [filter, setFilter] = useState('all')

  return (
    <div className="h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">⏱️ Activity Timeline</h2>
          <p className="text-sm text-gray-500 mt-1">Live updates van wat James doet</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-300 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {['all', 'system', 'code', 'waiting'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-purple-600 text-white'
                : 'bg-[#13131a] text-gray-400 hover:text-white'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-gray-700 to-transparent"></div>

        <div className="space-y-4">
          {activities
            .filter(a => filter === 'all' || a.type === filter)
            .map((activity, idx) => (
            <div key={activity.id} className="relative flex items-start gap-4 pl-2">
              {/* Icon */}
              <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${typeColors[activity.type]}`}>
                {activity.icon}
              </div>

              {/* Content */}
              <div className="flex-1 bg-[#13131a] rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-medium">{activity.text}</p>
                    <span className={`inline-block mt-2 px-2.5 py-1 rounded-full text-xs border ${typeColors[activity.type]}`}>
                      {activity.type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mt-6 bg-[#13131a] rounded-xl p-4 border border-gray-800">
        <p className="text-sm text-gray-500 mb-3">💡 Hier komt straks live wat James aan het doen is</p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Stuur een bericht..."
            className="flex-1 bg-[#1a1a23] border border-gray-800 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium transition-colors">
            Verstuur
          </button>
        </div>
      </div>
    </div>
  )
}
