import { formatDisplayDate } from '../utils/dateUtils'

const ENERGY_BADGE = {
  low:    { label: 'Low',    icon: '🔋', cls: 'bg-blue-50 border-blue-200 text-blue-600'   },
  medium: { label: 'Medium', icon: '🙂', cls: 'bg-sage-50 border-sage-200 text-sage-700'   },
  high:   { label: 'High',   icon: '⚡', cls: 'bg-amber-50 border-amber-200 text-amber-600' },
}

const MICROCOPY = [
  'Some days are for showing up, even when it\'s hard.',
  'Done is enough.',
  'Small progress still counts.',
  'Rest is part of the process.',
  'Every small step counts.',
]

function completionSummary(wins) {
  const total = wins.length
  const done  = wins.filter(w => w.completed).length
  if (total === 0) return { text: 'No wins planned', icon: '🌙' }
  if (done === 0)  return { text: 'Rest day',         icon: '🌙' }
  if (done === total) return { text: `All ${total} wins`, icon: '✨' }
  return { text: `${done} of ${total} wins`, icon: '🌱' }
}

function DayCard({ entry }) {
  const badge   = ENERGY_BADGE[entry.energy]
  const summary = completionSummary(entry.wins)

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="font-semibold text-stone-700 text-sm">
            {formatDisplayDate(entry.date)}
          </p>
          <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
            <span>{summary.icon}</span>
            <span>{summary.text} completed</span>
          </p>
        </div>

        {badge && (
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${badge.cls}`}>
            <span>{badge.icon}</span>
            {badge.label} energy
          </span>
        )}
      </div>

      {/* Wins list */}
      {entry.wins.length > 0 && (
        <ul className="space-y-1.5">
          {entry.wins.map((win, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center text-xs
                ${win.completed
                  ? 'bg-sage-100 border-sage-200 text-sage-600'
                  : 'border-stone-200 text-stone-300'}`}
              >
                {win.completed ? '✓' : ''}
              </span>
              <span className={`text-sm leading-snug ${win.completed ? 'text-stone-600' : 'text-stone-300 line-through'}`}>
                {win.title}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Reflection */}
      {entry.reflection && (
        <div className="border-t border-stone-50 pt-3">
          <p className="text-xs text-stone-400 italic leading-relaxed">
            "{entry.reflection}"
          </p>
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-sage-50 border border-sage-100 flex items-center justify-center mb-5">
        <svg viewBox="0 0 24 24" fill="none" stroke="#7da67d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M12 22V12" />
          <path d="M12 12C12 12 7 10 5 6c4 0 7 2 7 6z" />
          <path d="M12 12C12 12 17 10 19 6c-4 0-7 2-7 6z" />
        </svg>
      </div>
      <p className="text-stone-600 font-medium text-sm mb-1">Your history will grow here.</p>
      <p className="text-stone-400 text-xs leading-relaxed max-w-xs">
        Each time you start a fresh day, your wins get saved here. No pressure — it fills up naturally.
      </p>
    </div>
  )
}

export function HistoryPage({ history = [] }) {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto w-full">

      {/* Header */}
      <header className="space-y-1 pt-2">
        <p className="text-stone-400 text-sm">🌿 Looking back gently</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 leading-tight tracking-tight">
          Your small wins matter.
        </h1>
        <p className="text-stone-400 text-sm">
          Progress doesn't need to be perfect to count.
        </p>
      </header>

      {/* Timeline or empty state */}
      {history.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {history.map((entry, i) => (
            <div key={entry.date}>
              <DayCard entry={entry} />
              {i < history.length - 1 && i % 2 === 0 && (
                <p className="text-center text-xs text-stone-300 italic py-1">
                  {MICROCOPY[Math.floor(i / 2) % MICROCOPY.length]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <p className="text-center text-xs text-stone-300 pb-4">
          Every day you opened this app was a small act of care for yourself. 🌱
        </p>
      )}
    </div>
  )
}
