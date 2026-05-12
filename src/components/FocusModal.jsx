import { useState, useEffect, useRef } from 'react'
import { playTimerDone } from '../utils/sounds'

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
          playTimerDone()
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 animate-fade-in px-6">

      <p className="text-slate-400 text-sm font-light mb-10 tracking-widest uppercase">
        Focus session
      </p>

      {/* Current task */}
      {win && (
        <div className="text-center mb-10">
          <p className="text-slate-500 text-xs mb-2">Right now, just this one thing</p>
          <p className="text-white/90 text-xl font-semibold leading-snug">{win.title}</p>
          {win.tinyStep && (
            <p className="text-slate-400 text-sm mt-2">
              Start with: <span className="text-slate-300">{win.tinyStep}</span>
            </p>
          )}
        </div>
      )}

      {/* Timer circle */}
      {timerMinutes && (
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke={done ? '#7da67d' : 'rgba(169,196,169,0.6)'}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-white/90 tabular-nums">
                {done ? '✓' : formatTime(secondsLeft)}
              </span>
              {done && <span className="text-xs text-sage-400 mt-0.5">well done</span>}
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={pauseResume}
              disabled={done}
              className="px-5 py-2 rounded-full border border-white/20 text-white/70 text-sm hover:text-white/90 hover:border-white/40 transition disabled:opacity-30"
            >
              {running ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={resetTimer}
              className="px-5 py-2 rounded-full border border-white/10 text-white/40 text-sm hover:text-white/60 hover:border-white/20 transition"
            >
              Reset
            </button>
          </div>

          {!running && !done && (
            <button
              onClick={() => { setTimerMinutes(null); setRunning(false) }}
              className="mt-4 text-xs text-slate-500 hover:text-slate-400 transition"
            >
              Change timer
            </button>
          )}
        </div>
      )}

      {/* Timer picker */}
      {!timerMinutes && (
        <div className="mb-10 w-full max-w-xs">
          <p className="text-slate-500 text-xs text-center mb-4 tracking-wide">Set a gentle timer (optional)</p>
          <div className="grid grid-cols-4 gap-2">
            {TIMER_OPTIONS.map(min => (
              <button
                key={min}
                onClick={() => startTimer(min)}
                className="py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:border-white/30 hover:text-white/90 transition"
              >
                {min}m
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="text-center space-y-1 mb-12">
        <p className="text-slate-400 text-sm font-light">One small step is enough.</p>
        <p className="text-slate-500 text-xs">You don't have to finish — just begin.</p>
      </div>

      <button
        onClick={onClose}
        className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 text-sm hover:text-white/90 hover:border-white/40 transition"
      >
        End session
      </button>
    </div>
  )
}
