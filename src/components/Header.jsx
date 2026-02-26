import { useState } from 'react'

export default function Header({ currentTime }) {
  const [notifications] = useState(3)
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('nl-NL', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Europe/Amsterdam'
    })
  }

  return (
    <header className="h-16 bg-[#13131a] border-b border-gray-800 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#1a1a23] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Time */}
        <div className="text-sm text-gray-400 hidden md:block">
          {formatTime(currentTime)} CET
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {notifications > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium hidden md:block">Hi Sjoerd</span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
            SD
          </div>
        </div>
      </div>
    </header>
  )
}
