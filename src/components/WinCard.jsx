import { useState, useRef, useEffect } from 'react'

const NUMBER_COLORS = [
  'bg-sage-100   text-sage-700   border-sage-200',
  'bg-lavender-100 text-lavender-500 border-lavender-200',
  'bg-amber-50   text-amber-600   border-amber-200',
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
      className="absolute right-0 top-8 z-10 w-36 bg-white rounded-2xl border border-stone-100 py-1.5 animate-fade-in"
    >
      <button
        onClick={() => { onEdit(); onClose() }}
        className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition"
      >
        Edit
      </button>
      <button
        onClick={() => { onDelete(); onClose() }}
        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-50 transition"
      >
        Remove
      </button>
    </div>
  )
}

export function WinCard({ win, index, isActive, onStart, onComplete, onEdit, onDelete, onFocus }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const numClass = NUMBER_COLORS[index] ?? NUMBER_COLORS[0]

  const cardClass = win.completed
    ? 'opacity-60 bg-stone-50'
    : isActive
    ? 'bg-white border-l-4 border-l-sage-400'
    : 'bg-white'

  return (
    <div className={`relative rounded-2xl border border-stone-50 px-5 py-4 transition-all duration-300 ${cardClass}`}>
      <div className="flex items-start gap-4">
        {/* Number circle */}
        <button
          onClick={() => !win.completed && onComplete(win.id)}
          title={win.completed ? 'Completed' : 'Mark complete'}
          className={`flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-200 ${numClass} ${!win.completed ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
        >
          {win.completed ? '✓' : index + 1}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-base leading-snug ${win.completed ? 'line-through text-stone-400' : 'text-stone-800'}`}>
            {win.title}
          </p>
          {win.tinyStep && (
            <p className="text-sm text-stone-400 mt-1">
              <span className="text-stone-300">→</span> Tiny first step:{' '}
              <span className="text-stone-500">{win.tinyStep}</span>
            </p>
          )}
        </div>

        {/* Actions */}
        {!win.completed && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onStart}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sage-50 text-sage-700 text-xs font-medium hover:bg-sage-100 transition"
            >
              <span className="text-sage-500">▶</span>
              Start
            </button>

            <button
              onClick={() => onComplete(win.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-stone-400 text-xs font-medium hover:bg-stone-50 hover:text-stone-600 hover:border-stone-300 transition"
            >
              <span>✓</span>
              Done
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="w-7 h-7 flex items-center justify-center rounded-xl text-stone-400 hover:bg-stone-100 transition text-base leading-none"
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
          <span className="text-xs text-sage-500 font-medium flex-shrink-0">Done 🌿</span>
        )}
      </div>
    </div>
  )
}

export function EmptyWinSlot({ number, onAdd }) {
  return (
    <button
      onClick={onAdd}
      className="w-full rounded-2xl border-2 border-dashed border-stone-200 px-5 py-4 flex items-center gap-4 hover:border-sage-300 hover:bg-sage-50/40 transition-all duration-200 group"
    >
      <div className="w-9 h-9 rounded-full border-2 border-dashed border-stone-200 flex items-center justify-center text-sm font-semibold text-stone-300 group-hover:border-sage-300 group-hover:text-sage-400 transition">
        {number}
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-stone-400 group-hover:text-stone-500 transition">Add one more doable win</p>
        <p className="text-xs text-stone-300 mt-0.5">What would make today a little better?</p>
      </div>
      <span className="text-stone-300 group-hover:text-sage-400 text-xl font-light transition">+</span>
    </button>
  )
}
