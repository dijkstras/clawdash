import { useState } from 'react'

const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

const events = [
  { day: 0, time: '15:30', title: '🏒 Floortje Hockey', type: 'sport', duration: 60 },
  { day: 2, time: '15:15', title: '🏒 Floortje Hockey', type: 'sport', duration: 60 },
  { day: 2, time: '17:45', title: '🎵 Floortje Zangles', type: 'music', duration: 45 },
  { day: 4, time: '17:45', title: '🎵 Floortje Zangles', type: 'music', duration: 45 },
  { day: 5, time: '13:00', title: '🎉 Floortje Feestje Linde', type: 'party', duration: 240 },
  { day: 6, time: '08:45', title: '🏊 Giel Zwemles', type: 'sport', duration: 45 },
]

const typeColors = {
  sport: 'bg-green-500/20 text-green-300 border-green-500/30',
  music: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  party: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
}

export default function CalendarView() {
  const [currentWeek] = useState('26 feb - 2 mrt 2026')
  const [viewMode, setViewMode] = useState('week')

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">{currentWeek}</h2>
          <div className="flex items-center gap-1 bg-[#13131a] rounded-lg p-1">
            <button 
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === 'week' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === 'month' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors">
            Today
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#13131a] rounded-xl border border-gray-800 overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-800">
          {weekDays.map((day, idx) => {
            const isToday = idx === 2 // Wednesday
            return (
              <div 
                key={day} 
                className={`p-4 text-center border-r border-gray-800 last:border-r-0 ${
                  isToday ? 'bg-purple-500/10' : ''
                }`}
              >
                <p className={`text-sm font-medium ${isToday ? 'text-purple-400' : 'text-gray-400'}`}>
                  {day}
                </p>
                <p className={`text-2xl font-bold mt-1 ${isToday ? 'text-white' : 'text-gray-300'}`}>
                  {23 + idx}
                </p>
                {isToday && (
                  <div className="mt-2">
                    <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">Today</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-7 min-h-[400px]">
          {Array.from({ length: 7 }).map((_, idx) => {
            const dayEvents = events.filter(e => e.day === idx)
            const isToday = idx === 2
            
            return (
              <div 
                key={idx}
                className={`border-r border-gray-800 last:border-r-0 p-3 min-h-[400px] ${
                  isToday ? 'bg-purple-500/5' : ''
                }`}
              >
                <div className="space-y-2">
                  {dayEvents.map((event, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border text-sm cursor-pointer hover:scale-[1.02] transition-transform ${typeColors[event.type]}`}
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs opacity-75 mt-1">{event.time} ({event.duration}min)</p>
                    </div>
                  ))}
                  
                  {dayEvents.length === 0 && (
                    <div className="h-full flex items-center justify-center text-gray-600 text-sm">
                      Geen events
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-400">Sport</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-sm text-gray-400">Muziek</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
          <span className="text-sm text-gray-400">Feest</span>
        </div>
      </div>
    </div>
  )
}
