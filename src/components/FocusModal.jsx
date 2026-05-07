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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl shadow-card w-full max-w-sm p-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-stone-800">Focus time 🌿</h2>
            <p className="text-xs text-stone-400 mt-0.5">You've got this.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-400 hover:bg-stone-100 transition text-lg"
          >
            ×
          </button>
        </div>

        {/* Current task */}
        {win && (
          <div className="bg-sage-50 rounded-2xl p-4 mb-6">
            <p className="text-xs text-sage-500 font-medium uppercase tracking-wide mb-1">Working on</p>
            <p className="text-sm font-semibold text-stone-800 leading-snug">{win.title}</p>
            {win.tinyStep && (
              <p className="text-xs text-stone-500 mt-1.5">
                <span className="text-stone-300">→</span> {win.tinyStep}
              </p>
            )}
          </div>
        )}

        {/* Timer circle */}
        {timerMinutes && (
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#f5f5f4" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke={done ? '#7da67d' : '#a9c4a9'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold text-stone-800 tabular-nums">
                  {done ? '✓' : formatTime(secondsLeft)}
                </span>
                {done && <span className="text-xs text-sage-500 mt-0.5">Done!</span>}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={pauseResume}
                disabled={done}
                className="px-4 py-2 rounded-xl bg-sage-100 text-sage-700 text-sm font-medium hover:bg-sage-200 transition disabled:opacity-40"
              >
                {running ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={resetTimer}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-500 text-sm font-medium hover:bg-stone-50 transition"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Timer picker */}
        {!timerMinutes && (
          <div className="mb-6">
            <p className="text-sm text-stone-500 mb-3 text-center">Set a gentle timer (optional)</p>
            <div className="grid grid-cols-4 gap-2">
              {TIMER_OPTIONS.map(min => (
                <button
                  key={min}
                  onClick={() => startTimer(min)}
                  className="py-2.5 rounded-xl border border-stone-200 text-sm text-stone-600 font-medium hover:bg-sage-50 hover:border-sage-200 hover:text-sage-700 transition"
                >
                  {min}m
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Change timer when already set */}
        {timerMinutes && !running && !done && (
          <button
            onClick={() => { setTimerMinutes(null); setRunning(false) }}
            className="w-full text-center text-xs text-stone-400 hover:text-stone-500 transition mt-2"
          >
            Change timer
          </button>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-3 rounded-2xl bg-stone-50 border border-stone-100 text-stone-500 text-sm font-medium hover:bg-stone-100 transition"
        >
          End session
        </button>
      </div>
    </div>
  )
}
