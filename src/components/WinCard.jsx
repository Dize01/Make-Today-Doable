import { useState, useRef, useEffect } from 'react'

const NUMBER_COLORS = [
  'bg-sage-100 text-sage-700 border-sage-200 dark:bg-sage-900/40 dark:text-sage-400 dark:border-sage-800',
  'bg-lavender-100 text-lavender-500 border-lavender-200 dark:bg-purple-900/40 dark:text-purple-400 dark:border-purple-800',
  'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
]

function DotsMenu({ onEdit, onDelete, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute right-0 top-8 z-10 w-36 bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 py-1.5 animate-fade-in"
    >
      <button
        onClick={() => { onEdit(); onClose() }}
        className="w-full text-left px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition"
      >
        Edit
      </button>
      <button
        onClick={() => { onDelete(); onClose() }}
        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
      >
        Remove
      </button>
    </div>
  )
}

export function WinCard({ win, index, isActive, isNew, onStart, onComplete, onReactivate, onEdit, onDelete, onFocus }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const numClass = NUMBER_COLORS[index] ?? NUMBER_COLORS[0]

  const cardClass = win.completed
    ? 'opacity-60 bg-stone-50 dark:bg-stone-900/50 hover:opacity-80 transition-opacity'
    : isActive
    ? 'bg-white dark:bg-stone-800 border-l-4 border-l-sage-400'
    : 'bg-white dark:bg-stone-800'

  return (
    <div className={`relative rounded-2xl border border-stone-50 dark:border-stone-700 px-5 py-4 transition-all duration-300 ${cardClass}`}>
      {isNew && <div className="absolute inset-0 rounded-2xl pointer-events-none task-added" />}
      <div className="flex items-start gap-4">
        {/* Number circle */}
        <button
          onClick={() => win.completed ? onReactivate(win.id) : onComplete(win.id)}
          title={win.completed ? 'Mark as not done' : 'Mark complete'}
          className={`flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-200 cursor-pointer ${numClass} ${win.completed ? 'hover:opacity-60 hover:scale-105' : 'hover:scale-110'}`}
        >
          {win.completed ? '✓' : index + 1}
        </button>

        {/* Content + Actions */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-4">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className={`font-medium text-base leading-snug ${win.completed ? 'line-through text-stone-400 dark:text-stone-500' : 'text-stone-800 dark:text-stone-100'}`}>
              {win.title}
            </p>
            {win.tinyStep && (
              <p className="text-sm text-stone-400 dark:text-stone-500 mt-1">
                <span className="text-stone-300 dark:text-stone-600">→</span> Tiny first step:{' '}
                <span className="text-stone-500 dark:text-stone-400">{win.tinyStep}</span>
              </p>
            )}
          </div>

          {/* Actions — beside text on desktop, below on mobile */}
          {!win.completed && (
            <div className="flex items-center gap-2 mt-3 sm:mt-0 flex-shrink-0">
              <button
                onClick={onStart}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sage-50 dark:bg-sage-900/30 text-sage-700 dark:text-sage-400 text-xs font-medium hover:bg-sage-100 dark:hover:bg-sage-900/50 transition"
              >
                <span className="text-sage-500">▶</span>
                Start
              </button>
              <button
                onClick={() => onComplete(win.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-600 text-stone-400 dark:text-stone-400 text-xs font-medium hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-stone-600 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-500 transition"
              >
                <span>✓</span>
                Done
              </button>
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(v => !v)}
                  className="w-7 h-7 flex items-center justify-center rounded-xl text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-700 transition text-base leading-none"
                >
                  ···
                </button>
                {menuOpen && (
                  <DotsMenu
                    onEdit={() => onEdit(win)}
                    onDelete={() => onDelete(win.id)}
                    onClose={() => setMenuOpen(false)}
                  />
                )}
              </div>
            </div>
          )}

          {win.completed && (
            <div className="flex items-center gap-2 mt-1 sm:mt-0 flex-shrink-0">
              <span className="text-xs text-sage-500 dark:text-sage-400 font-medium">Done 🌿</span>
              <button
                onClick={() => onReactivate(win.id)}
                className="text-xs text-stone-300 dark:text-stone-600 hover:text-stone-500 dark:hover:text-stone-400 transition underline underline-offset-2"
              >
                Undo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function EmptyWinSlot({ number, onAdd }) {
  return (
    <button
      onClick={onAdd}
      className="w-full rounded-2xl border-2 border-dashed border-stone-200 dark:border-stone-700 px-5 py-4 flex items-center gap-4 hover:border-sage-300 dark:hover:border-sage-700 hover:bg-sage-50/40 dark:hover:bg-sage-900/20 transition-all duration-200 group"
    >
      <div className="w-9 h-9 rounded-full border-2 border-dashed border-stone-200 dark:border-stone-600 flex items-center justify-center text-sm font-semibold text-stone-300 dark:text-stone-600 group-hover:border-sage-300 dark:group-hover:border-sage-700 group-hover:text-sage-400 transition">
        {number}
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-stone-400 dark:text-stone-500 group-hover:text-stone-500 dark:group-hover:text-stone-400 transition">Add one more doable win</p>
        <p className="text-xs text-stone-300 dark:text-stone-600 mt-0.5">What would make today a little better?</p>
      </div>
      <span className="text-stone-300 dark:text-stone-600 group-hover:text-sage-400 text-xl font-light transition">+</span>
    </button>
  )
}
