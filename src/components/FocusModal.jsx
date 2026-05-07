import { useState, useEffect, useRef } from 'react'

const TIMER_OPTIONS = [5, 10, 15, 25]

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function FocusModal({ win, onClose }) {
  const [timerMinutes, setTimerMinutes] = useState(null)
  const [secondsLeft,  setSecondsLeft]  = useState(0)
  const [running,      setRunning]      = useState(false)
  const [done,         setDone]         = useState(false)
  const intervalRef = useRef(null)

  function startTimer(min) {
    setTimerMinutes(min)
    setSecondsLeft(min * 60)
    setRunning(true)
    setDone(false)
  }

  function pauseResume() {
    setRunning(r => !r)
  }

  function resetTimer() {
    setRunning(false)
    setDone(false)
    setSecondsLeft(timerMinutes * 60)
  }

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          setDone(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  const progress = timerMinutes ? 1 - secondsLeft / (timerMinutes * 60) : 0
  const circumference = 2 * Math.PI * 54

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-card w-full max-w-sm p-7 animate-slide-up">

        {/* Close */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-300 hover:text-stone-500 hover:bg-stone-100 transition text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Current task — calm room for one task */}
        {win ? (
          <div className="mb-6">
            <p className="text-xs text-stone-400 font-medium mb-2">Right now, just this one thing:</p>
            <p className="text-base font-semibold text-stone-800 leading-snug">{win.title}</p>
            {win.tinyStep && (
              <div className="mt-3 flex items-start gap-2 bg-sage-50 border border-sage-100 rounded-xl px-3 py-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#7da67d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5">
                  <polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-sage-600 leading-none mb-0.5">Start with</p>
                  <p className="text-xs text-stone-600 leading-snug">{win.tinyStep}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-base font-semibold text-stone-800">Free focus session</p>
            <p className="text-xs text-stone-400 mt-0.5">No task needed — just a quiet moment.</p>
          </div>
        )}

        {/* Timer circle */}
        {timerMinutes && (
          <div className="flex flex-col items-center mb-5">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#f5f5f4" strokeWidth="7" />
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke={done ? '#7da67d' : '#a9c4a9'}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-semibold text-stone-700 tabular-nums">
                  {done ? '✓' : formatTime(secondsLeft)}
                </span>
                {done && <span className="text-xs text-sage-500 mt-0.5">well done</span>}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={pauseResume}
                disabled={done}
                className="px-4 py-2 rounded-xl bg-sage-50 text-sage-700 text-sm font-medium hover:bg-sage-100 transition disabled:opacity-40"
              >
                {running ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={resetTimer}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-400 text-sm font-medium hover:bg-stone-50 transition"
              >
                Reset
              </button>
            </div>

            {!running && !done && (
              <button
                onClick={() => { setTimerMinutes(null); setRunning(false) }}
                className="mt-3 text-xs text-stone-300 hover:text-stone-400 transition"
              >
                Change timer
              </button>
            )}
          </div>
        )}

        {/* Timer picker */}
        {!timerMinutes && (
          <div className="mb-5">
            <p className="text-xs text-stone-400 mb-3 text-center">Set a gentle timer (optional)</p>
            <div className="grid grid-cols-4 gap-2">
              {TIMER_OPTIONS.map(min => (
                <button
                  key={min}
                  onClick={() => startTimer(min)}
                  className="py-2.5 rounded-xl bg-stone-50 border border-stone-100 text-sm text-stone-500 font-medium hover:bg-sage-50 hover:border-sage-200 hover:text-sage-700 transition"
                >
                  {min}m
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-2xl border border-stone-100 text-stone-400 text-sm hover:bg-stone-50 hover:text-stone-500 transition"
        >
          End session
        </button>
      </div>
    </div>
  )
}
