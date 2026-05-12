import { useState, useEffect } from 'react'
import { useAppData } from './hooks/useAppData'
import { useDarkMode } from './hooks/useDarkMode'
import { formatDisplayDate, getGreeting, getGreetingEmoji, todayKey } from './utils/dateUtils'
import { playWinComplete } from './utils/sounds'

import { Sidebar }             from './components/Sidebar'
import { EnergySelector }      from './components/EnergySelector'
import { WinsSection }         from './components/WinsSection'
import { FocusCard }           from './components/FocusCard'
import { FocusModal }          from './components/FocusModal'
import { OverwhelmedCard }     from './components/OverwhelmedCard'
import { BreathingOverlay }    from './components/BreathingOverlay'
import { NewDayModal }         from './components/NewDayModal'
import { HistoryPage }         from './components/HistoryPage'
import { CalendarPage }        from './components/CalendarPage'
import { RoutinesPage }        from './components/RoutinesPage'
import { PrivacyPage }         from './components/PrivacyPage'
import { TermsPage }           from './components/TermsPage'
import { ReleaseNotesPage }    from './components/ReleaseNotesPage'

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

const CURRENT_VERSION = 'v1.5'

function ReleaseToast({ onViewNotes, onDismiss }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 w-72 bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 p-4 shadow-card animate-slide-up">
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0">🌱</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">
            {CURRENT_VERSION} is here
          </p>
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5 leading-relaxed">
            Gentle sound feedback for tasks and focus.
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-stone-300 dark:text-stone-600 hover:text-stone-500 dark:hover:text-stone-400 transition text-xl leading-none"
        >
          ×
        </button>
      </div>
      <div className="flex gap-2 mt-3 pl-8">
        <button
          onClick={onViewNotes}
          className="flex-1 py-1.5 rounded-xl bg-sage-50 dark:bg-sage-900/30 text-sage-700 dark:text-sage-400 text-xs font-medium hover:bg-sage-100 dark:hover:bg-sage-900/50 transition"
        >
          See what's new →
        </button>
        <button
          onClick={onDismiss}
          className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-600 text-stone-400 dark:text-stone-500 text-xs hover:bg-stone-50 dark:hover:bg-stone-700 transition"
        >
          Got it
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useDarkMode()

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

  const [activeNav,         setActiveNav]         = useState('today')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [focusWin,          setFocusWin]          = useState(null)
  const [showBreathing,     setShowBreathing]     = useState(false)
  const [showNewDayConfirm, setShowNewDayConfirm] = useState(false)
  const [showReleaseToast,  setShowReleaseToast]  = useState(false)

  useEffect(() => {
    if (localStorage.getItem('seenVersion') !== CURRENT_VERSION) {
      const t = setTimeout(() => setShowReleaseToast(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  function handleStartFocus(win) {
    setFocusWin(win)
  }

  function handleWinStart(id) {
    updateWin(id, { started: true })
  }

  function handleWinComplete(id) {
    updateWin(id, { completed: true })
    playWinComplete()
  }

  function handleWinReactivate(id) {
    updateWin(id, { completed: false, started: false })
  }

  function handleWinEdit(id, patch) {
    updateWin(id, patch)
  }

  function handleNewDay() {
    setShowNewDayConfirm(true)
  }

  function handleDismissRelease() {
    localStorage.setItem('seenVersion', CURRENT_VERSION)
    setShowReleaseToast(false)
  }

  function handleViewRelease() {
    setActiveNav('release')
    localStorage.setItem('seenVersion', CURRENT_VERSION)
    setShowReleaseToast(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900 flex transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-10">
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

            {activeNav === 'privacy'  && <PrivacyPage />}
            {activeNav === 'terms'    && <TermsPage />}
            {activeNav === 'release'  && <ReleaseNotesPage />}
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
              <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <header className="space-y-1">
                  <p className="text-stone-400 dark:text-stone-500 text-sm flex items-center gap-1.5">
                    <span>{getGreetingEmoji()}</span>
                    {getGreeting()} 👋
                  </p>
                  <div className="flex items-end justify-between flex-wrap gap-3">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-100 leading-tight tracking-tight">
                        Let's make today doable.
                      </h1>
                      <p className="text-stone-400 dark:text-stone-500 text-sm mt-1">Small steps. Real progress.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-sm cursor-default select-none">
                        <CalendarIcon />
                        <span className="font-medium whitespace-nowrap">
                          {formatDisplayDate(data.date || todayKey())}
                        </span>
                      </div>
                      <button
                        onClick={handleNewDay}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-sm hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-stone-700 dark:hover:text-stone-200 transition"
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
                  onReactivate={handleWinReactivate}
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

      {showReleaseToast && (
        <ReleaseToast onViewNotes={handleViewRelease} onDismiss={handleDismissRelease} />
      )}
    </div>
  )
}
