import { useState } from 'react'
import { useAppData } from './hooks/useAppData'
import { formatDisplayDate, getGreeting, getGreetingEmoji, todayKey } from './utils/dateUtils'

import { Sidebar }          from './components/Sidebar'
import { EnergySelector }   from './components/EnergySelector'
import { WinsSection }      from './components/WinsSection'
import { FocusCard }        from './components/FocusCard'
import { FocusModal }       from './components/FocusModal'
import { OverwhelmedCard }  from './components/OverwhelmedCard'
import { BreathingOverlay } from './components/BreathingOverlay'
import { NewDayModal }      from './components/NewDayModal'
import { HistoryPage }      from './components/HistoryPage'
import { CalendarPage }     from './components/CalendarPage'
import { RoutinesPage }     from './components/RoutinesPage'

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 2v6h-6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13a9 9 0 1 1-3-7.7L21 8" />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  )
}

export default function App() {
  const {
    data,
    showNewDayModal,
    setEnergy,
    addWin,
    updateWin,
    deleteWin,
    loadRoutine,
    addCustomRoutine,
    deleteCustomRoutine,
    startFresh,
    continueYesterday,
    startedCount,
    history,
    customRoutines,
  } = useAppData()

  const [activeNav,       setActiveNav]       = useState('today')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [focusWin,        setFocusWin]        = useState(null)
  const [showBreathing,   setShowBreathing]   = useState(false)
  const [showNewDayConfirm, setShowNewDayConfirm] = useState(false)

  function handleStartFocus(win) {
    setFocusWin(win)
  }

  function handleWinStart(id) {
    updateWin(id, { started: true })
  }

  function handleWinComplete(id) {
    updateWin(id, { completed: true })
  }

  function handleWinEdit(id, patch) {
    updateWin(id, patch)
  }

  function handleNewDay() {
    setShowNewDayConfirm(true)
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-stone-50 border-b border-stone-200 sticky top-0 z-10">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-xl text-stone-500 hover:bg-stone-100 transition"
          >
            <MenuIcon />
          </button>
          <div className="flex items-center gap-1.5 text-sm font-medium text-stone-600">
            <span className="text-base">🌱</span>
            Make Today Doable
          </div>
          <div className="w-8" />
        </div>

        <div className="flex-1 flex max-w-screen-xl mx-auto w-full">
          <main className="flex-1 flex flex-col min-w-0">

            {activeNav === 'history'  && <HistoryPage history={history} />}
            {activeNav === 'routines' && (
              <RoutinesPage
                existingWins={data.wins}
                customRoutines={customRoutines}
                onStartRoutine={(tasks) => { loadRoutine(tasks); setActiveNav('today') }}
                onAddRoutine={addCustomRoutine}
                onDeleteRoutine={deleteCustomRoutine}
              />
            )}
            {activeNav === 'calendar' && (
              <CalendarPage
                history={history}
                todayEntry={{ date: data.date, energy: data.energy, wins: data.wins }}
              />
            )}

            {activeNav === 'today' && (
              <div className="flex flex-col gap-5 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <header className="space-y-1">
                  <p className="text-stone-400 text-sm flex items-center gap-1.5">
                    <span>{getGreetingEmoji()}</span>
                    {getGreeting()} 👋
                  </p>
                  <div className="flex items-end justify-between flex-wrap gap-3">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 leading-tight tracking-tight">
                        Let's make today doable.
                      </h1>
                      <p className="text-stone-400 text-sm mt-1">Small steps. Real progress.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-stone-200 bg-white text-stone-600 text-sm cursor-default select-none">
                        <CalendarIcon />
                        <span className="font-medium whitespace-nowrap">
                          {formatDisplayDate(data.date || todayKey())}
                        </span>
                      </div>
                      <button
                        onClick={handleNewDay}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-stone-200 bg-white text-stone-500 text-sm hover:bg-stone-50 hover:text-stone-700 transition"
                      >
                        <RefreshIcon />
                        <span className="hidden sm:inline">New day</span>
                      </button>
                    </div>
                  </div>
                </header>

                {/* Energy selector */}
                <EnergySelector value={data.energy} onChange={setEnergy} />

                {/* 3 Wins */}
                <WinsSection
                  wins={data.wins}
                  startedCount={startedCount}
                  onStart={handleWinStart}
                  onComplete={handleWinComplete}
                  onAdd={addWin}
                  onEdit={handleWinEdit}
                  onDelete={deleteWin}
                  onFocus={handleStartFocus}
                />

                {/* Bottom cards row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FocusCard wins={data.wins} onStartFocus={handleStartFocus} />
                  <OverwhelmedCard onBreak={() => setShowBreathing(true)} />
                </div>

                {/* Footer affirmation */}
                <p className="text-center text-xs text-stone-300 py-2">
                  ⭐ Every small step forward counts. You're doing great. 💜
                </p>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Modals / Overlays */}
      {showNewDayModal && !showNewDayConfirm && (
        <NewDayModal onStartFresh={startFresh} onContinue={continueYesterday} />
      )}

      {showNewDayConfirm && (
        <NewDayModal
          onStartFresh={() => { startFresh(); setShowNewDayConfirm(false) }}
          onContinue={() => setShowNewDayConfirm(false)}
        />
      )}

      {focusWin !== null && (
        <FocusModal win={focusWin} onClose={() => setFocusWin(null)} />
      )}

      {showBreathing && (
        <BreathingOverlay onClose={() => setShowBreathing(false)} />
      )}
    </div>
  )
}
