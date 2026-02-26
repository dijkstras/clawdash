import { useState } from 'react'

const initialTodos = {
  werk: [
    { id: 1, text: 'Meeting met design team', done: false, priority: 'high' },
    { id: 2, text: 'Granola dashboard afmaken', done: false, priority: 'high' },
    { id: 3, text: 'Review pull requests', done: true, priority: 'medium' },
  ],
  prive: [
    { id: 4, text: 'Hockey Floortje woensdag', done: true, priority: 'medium' },
    { id: 5, text: 'Zangles Floortje vrijdag', done: false, priority: 'low' },
    { id: 6, text: 'Boodschappen doen', done: false, priority: 'medium' },
  ]
}

export default function TodoBoard() {
  const [todos, setTodos] = useState(initialTodos)
  const [newTodo, setNewTodo] = useState('')
  const [category, setCategory] = useState('werk')

  const toggleTodo = (id, cat) => {
    setTodos(prev => ({
      ...prev,
      [cat]: prev[cat].map(t => t.id === id ? { ...t, done: !t.done } : t)
    }))
  }

  const addTodo = () => {
    if (!newTodo.trim()) return
    const todo = {
      id: Date.now(),
      text: newTodo,
      done: false,
      priority: 'medium'
    }
    setTodos(prev => ({
      ...prev,
      [category]: [...prev[category], todo]
    }))
    setNewTodo('')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">✅ Todo Board</h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-400">
            {todos.werk.filter(t => !t.done).length + todos.prive.filter(t => !t.done).length} open
          </span>
        </div>
      </div>

      {/* Add Todo */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Nieuwe taak..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
          >
            <option value="werk">💼 Werk</option>
            <option value="prive">🏠 Privé</option>
          </select>
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white font-medium"
          >
            +
          </button>
        </div>
      </div>

      {/* Todo Lists */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Werk */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            💼 Werk
            <span className="text-sm text-gray-500">({todos.werk.filter(t => !t.done).length})</span>
          </h3>
          <div className="space-y-2">
            {todos.werk.map(todo => (
              <div
                key={todo.id}
                onClick={() => toggleTodo(todo.id, 'werk')}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  todo.done ? 'bg-gray-900/50 opacity-50' : 'bg-gray-700/50 hover:bg-gray-700'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  todo.done ? 'bg-green-500 border-green-500' : 'border-gray-500'
                }`}>
                  {todo.done && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                </div>
                <span className={`flex-1 ${todo.done ? 'line-through text-gray-500' : 'text-white'}`}>
                  {todo.text}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  todo.priority === 'high' ? 'bg-red-900/50 text-red-300' :
                  todo.priority === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                  'bg-green-900/50 text-green-300'
                }`}>
                  {todo.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Privé */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            🏠 Privé
            <span className="text-sm text-gray-500">({todos.prive.filter(t => !t.done).length})</span>
          </h3>
          <div className="space-y-2">
            {todos.prive.map(todo => (
              <div
                key={todo.id}
                onClick={() => toggleTodo(todo.id, 'prive')}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                  todo.done ? 'bg-gray-900/50 opacity-50' : 'bg-gray-700/50 hover:bg-gray-700'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  todo.done ? 'bg-green-500 border-green-500' : 'border-gray-500'
                }`}>
                  {todo.done && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                </div>
                <span className={`flex-1 ${todo.done ? 'line-through text-gray-500' : 'text-white'}`}>
                  {todo.text}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  todo.priority === 'high' ? 'bg-red-900/50 text-red-300' :
                  todo.priority === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                  'bg-green-900/50 text-green-300'
                }`}>
                  {todo.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
