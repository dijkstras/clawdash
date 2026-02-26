import { useState } from 'react'

const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

const events = [
  { day: 0, time: '15:30', title: '🏒 Floortje Hockey', type: 'sport' },
  { day: 2, time: '15:15', title: '🏒 Floortje Hockey', type: 'sport' },
  { day: 2, time: '17:45', title: '🎵 Floortje Zangles', type: 'music' },
  { day: 4, time: '17:45', title: '🎵 Floortje Zangles', type: 'music' },
  { day: 6, time: '08:45', title: '🏊 Giel Zwemles', type: 'sport' },
  { day: 5, time: '13:00', title: '🎉 Floortje Feestje', type: 'party' },
]

export default function Calendar() {
  const [currentWeek] = useState('26 feb - 2 mrt 2026')
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📅 Weekoverzicht</h2>
        <span className="text-lg text-gray-300">{currentWeek}</span>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: 7 }).map((_, idx) => {
          const dayEvents = events.filter(e => e.day === idx)
          const isToday = idx === 2 // Woensdag
          
          return (
            <div 
              key={idx}
              className={`min-h-[120px] bg-gray-800 rounded-lg p-2 border ${
                isToday ? 'border-blue-500 bg-gray-700/50' : 'border-gray-700'
              }`}
            >
              <div className={`text-sm mb-2 ${isToday ? 'text-blue-400 font-bold' : 'text-gray-500'}`}>
                {isToday ? 'Vandaag' : ''}
              </div>
              
              <div className="space-y-1">
                {dayEvents.map((event, i) => (
                  <div 
                    key={i}
                    className={`text-xs p-2 rounded ${
                      event.type === 'sport' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                      event.type === 'music' ? 'bg-purple-900/50 text-purple-300 border border-purple-700' :
                      'bg-pink-900/50 text-pink-300 border border-pink-700'
                    }`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-75">{event.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Legend */}
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-900/50 border border-green-700 rounded"></div>
          <span className="text-gray-400">Sport</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-900/50 border border-purple-700 rounded"></div>
          <span className="text-gray-400">Muziek</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pink-900/50 border border-pink-700 rounded"></div>
          <span className="text-gray-400">Feest</span>
        </div>
      </div>
    </div>
  )
}
