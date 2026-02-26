import { useState, useEffect } from 'react'

const activities = [
  { id: 1, time: '10:15', text: 'Dashboard project gestart', type: 'system' },
  { id: 2, time: '10:24', text: 'React + Vite geconfigureerd', type: 'code' },
  { id: 3, time: '10:30', text: 'Tailwind CSS toegevoegd', type: 'code' },
  { id: 4, time: '11:13', text: 'Layout componenten gebouwd', type: 'code' },
  { id: 5, time: '11:15', text: 'Wacht op feedback van Sjoerd', type: 'waiting' },
]

export default function Timeline() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">⏱️ Activity Timeline</h2>
        <span className="text-sm text-gray-400">Live updates</span>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
        
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="relative flex items-start gap-4 pl-10">
              {/* Dot */}
              <div className={`absolute left-2 w-4 h-4 rounded-full border-2 border-gray-900 ${
                activity.type === 'system' ? 'bg-blue-500' :
                activity.type === 'code' ? 'bg-green-500' :
                'bg-yellow-500'
              }`}></div>
              
              {/* Content */}
              <div className="flex-1 bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-start">
                  <p className="text-white">{activity.text}</p>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
                <span className={`text-xs mt-2 inline-block px-2 py-1 rounded ${
                  activity.type === 'system' ? 'bg-blue-900/50 text-blue-300' :
                  activity.type === 'code' ? 'bg-green-900/50 text-green-300' :
                  'bg-yellow-900/50 text-yellow-300'
                }`}>
                  {activity.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Input for new activity */}
      <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
        <p className="text-sm text-gray-400 mb-2">💡 Hier komt straks live wat ik aan het doen ben</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Test: typ iets..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
            disabled
          />
          <button className="bg-blue-600 px-4 py-2 rounded text-white opacity-50" disabled>
            Verstuur
          </button>
        </div>
      </div>
    </div>
  )
}
