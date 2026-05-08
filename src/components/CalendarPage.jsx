import { useState, useMemo } from 'react'
import { todayKey } from '../utils/dateUtils'

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const ENERGY_BADGE = {
  low:    { label: 'Low',    icon: '🔋', cls: 'bg-blue-50 border-blue-200 text-blue-600'   },
  medium: { label: 'Medium', icon: '🙂', cls: 'bg-sage-50 border-sage-200 text-sage-700'   },
  high:   { label: 'High',   icon: '⚡', cls: 'bg-amber-50 border-amber-200 text-amber-600' },
}

function plantIcon(completed) {
  if (completed >= 3) return '🌳'
  if (completed === 2) return '🌿'
  if (completed === 1) return '🌱'
  return null
}

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function DayCell({ day, entry, isToday, isSelected, onClick }) {
  if (!day) return <div />

  const completed = entry ? entry.wins.filter(w => w.completed).length : 0
  const plant     = entry ? plantIcon(completed) : null
  const hasData   = !!entry

  return (
    <button
      onClick={onClick}
      className={[
        'relative flex flex-col items-center justify-between rounded-xl p-1.5 sm:p-2 aspect-square text-left transition-all duration-150 border',
        isSelected
          ? 'bg-sage-50 border-sage-200'
          : isToday
          ? 'bg-white border-sage-200 ring-1 ring-sage-200'
          : hasData
          ? 'bg-white border-stone-100 hover:bg-stone-50 hover:border-stone-200'
          : 'bg-white border-stone-50 hover:bg-stone-50',
      ].join(' ')}
    >
      <span className={`text-xs font-medium self-start leading-none
        ${isSelected ? 'text-sage-700' : isToday ? 'text-sage-600' : 'text-stone-500'}`}>
        {day}
      </span>

      {plant && (
        <span className="text-xs leading-none mt-auto">{plant}</span>
      )}

      {entry?.energy && !plant && (
        <span className="text-xs leading-none mt-auto">
          {ENERGY_BADGE[entry.energy]?.icon}
        </span>
      )}
    </button>
  )
}

function DayDetail({ entry, dateStr }) {
  if (!dateStr) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 text-center px-4">
        <p className="text-stone-300 text-sm">Select a day to see details</p>
        <p className="text-stone-200 text-xs mt-1">Small progress still counts.</p>
      </div>
    )
  }

  const [y, m, d] = dateStr.split('-').map(Number)
  const label = new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  if (!entry) {
    return (
      <div className="p-5 space-y-3">
        <p className="text-sm font-semibold text-stone-700">{label}</p>
        <div className="pt-4 text-center">
          <p className="text-stone-300 text-sm italic">Rest day.</p>
          <p className="text-stone-200 text-xs mt-1">Rest days matter too.</p>
        </div>
      </div>
    )
  }

  const badge     = ENERGY_BADGE[entry.energy]
  const completed = entry.wins.filter(w => w.completed).length
  const plant     = plantIcon(completed)

  return (
    <div className="p-5 space-y-4 animate-fade-in">
      <div>
        <p className="text-sm font-semibold text-stone-700">{label}</p>
        {plant && (
          <p className="text-xs text-stone-400 mt-0.5">
            {plant} {completed} of {entry.wins.length} wins completed
          </p>
        )}
      </div>

      {badge && (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${badge.cls}`}>
          {badge.icon} {badge.label} energy
        </span>
      )}

      {entry.wins.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">Wins</p>
          {entry.wins.map((win, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded-full border flex items-center justify-center text-xs
                ${win.completed ? 'bg-sage-100 border-sage-200 text-sage-600' : 'border-stone-200'}`}>
                {win.completed ? '✓' : ''}
              </span>
              <span className={`text-sm leading-snug ${win.completed ? 'text-stone-600' : 'text-stone-300 line-through'}`}>
                {win.title}
              </span>
            </div>
          ))}
        </div>
      )}

      {entry.reflection && (
        <div className="bg-stone-50 rounded-xl px-3 py-3 border border-stone-100">
          <p className="text-xs text-stone-400 italic leading-relaxed">"{entry.reflection}"</p>
        </div>
      )}

      {!entry.reflection && (
        <p className="text-xs text-stone-300 italic">No reflection noted.</p>
      )}
    </div>
  )
}

export function CalendarPage({ history = [], todayEntry }) {
  const today = todayKey()
  const [viewYear,  setViewYear]  = useState(() => new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth())
  const [selected,  setSelected]  = useState(null)

  const historyMap = useMemo(() => {
    const map = {}
    history.forEach(e => { map[e.date] = e })
    if (todayEntry?.date) map[todayEntry.date] = todayEntry
    return map
  }, [history, todayEntry])

  const { cells, firstDay } = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1).getDay()
    const days  = new Date(viewYear, viewMonth + 1, 0).getDate()
    return {
      firstDay: first,
      cells: [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)],
    }
  }, [viewYear, viewMonth])

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const selectedEntry = selected ? historyMap[selected] : null

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 w-full max-w-screen-lg mx-auto">

      {/* Header */}
      <header className="space-y-1 pt-2">
        <p className="text-stone-400 text-sm">🌿 A gentle view of your days</p>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 leading-tight tracking-tight">
              Your month, softly remembered.
            </h1>
            <p className="text-stone-400 text-sm mt-1">Progress doesn't need to be perfect to matter.</p>
          </div>
        </div>
      </header>

      <div className="flex gap-5 items-start">

        {/* Calendar panel */}
        <div className="flex-1 min-w-0 bg-white rounded-3xl border border-stone-100 p-5 space-y-4">

          {/* Month nav */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition"
            >
              <ChevronLeft />
            </button>

            <p className="text-sm font-semibold text-stone-700">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </p>

            <button
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1">
            {DAY_LABELS.map(d => (
              <div key={d} className="text-center text-xs text-stone-300 font-medium py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              const key   = day ? dateKey(viewYear, viewMonth, day) : null
              const entry = key ? historyMap[key] : null
              return (
                <DayCell
                  key={i}
                  day={day}
                  entry={entry}
                  isToday={key === today}
                  isSelected={key === selected}
                  onClick={() => key && setSelected(s => s === key ? null : key)}
                />
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 pt-1 border-t border-stone-50 flex-wrap">
            <p className="text-xs text-stone-300">Legend:</p>
            {[['🌱','1 win'],['🌿','2 wins'],['🌳','3 wins']].map(([icon, label]) => (
              <span key={label} className="text-xs text-stone-300 flex items-center gap-1">
                <span>{icon}</span>{label}
              </span>
            ))}
          </div>
        </div>

        {/* Detail panel — desktop only */}
        <div className="hidden lg:block w-64 flex-shrink-0 bg-white rounded-3xl border border-stone-100 min-h-48">
          <DayDetail entry={selectedEntry} dateStr={selected} />
        </div>
      </div>

      {/* Detail card — mobile/tablet, shown when a day is selected */}
      {selected && (
        <div className="lg:hidden bg-white rounded-3xl border border-stone-100 animate-slide-up">
          <DayDetail entry={selectedEntry} dateStr={selected} />
        </div>
      )}

      <p className="text-center text-xs text-stone-300 pb-4">
        Not every day needs to be productive. Showing up is enough. 🌱
      </p>
    </div>
  )
}
