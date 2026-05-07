import { useState, useEffect, useRef } from 'react'

const PHASES = [
  { label: 'Breathe in',  duration: 4000, scale: 1.25, opacity: 1   },
  { label: 'Hold',        duration: 2000, scale: 1.25, opacity: 0.9 },
  { label: 'Breathe out', duration: 4000, scale: 0.85, opacity: 0.6 },
  { label: 'Rest',        duration: 2000, scale: 0.85, opacity: 0.5 },
]

const TOTAL = 2 * 60 // 2 minutes in seconds

export function BreathingOverlay({ onClose }) {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(TOTAL)
  const phaseRef = useRef(0)
  const timerRef = useRef(null)
  const phaseTimerRef = useRef(null)

  // Countdown
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { clearInterval(timerRef.current); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  // Phase cycle
  useEffect(() => {
    function nextPhase() {
      phaseRef.current = (phaseRef.current + 1) % PHASES.length
      setPhaseIndex(phaseRef.current)
      phaseTimerRef.current = setTimeout(nextPhase, PHASES[phaseRef.current].duration)
    }
    phaseTimerRef.current = setTimeout(nextPhase, PHASES[0].duration)
    return () => clearTimeout(phaseTimerRef.current)
  }, [])

  const phase = PHASES[phaseIndex]
  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const timeStr = `${mins}:${String(secs).padStart(2, '0')}`

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 animate-fade-in">
      <p className="text-slate-400 text-sm font-light mb-10 tracking-widest uppercase">
        Two minute break
      </p>

      {/* Breathing circle */}
      <div
        className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-200/30 to-lavender-200/30 border border-white/10 flex items-center justify-center transition-all duration-1000 ease-in-out mb-8"
        style={{ transform: `scale(${phase.scale})`, opacity: phase.opacity }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100/20 to-lavender-100/20 border border-white/10 flex items-center justify-center">
          <span className="text-4xl">☁️</span>
        </div>
      </div>

      <p className="text-white/80 text-xl font-light mb-2 transition-all duration-500">
        {phase.label}
      </p>
      <p className="text-slate-400 text-sm mb-12">
        {timeStr} remaining
      </p>

      <div className="text-center space-y-2 px-8">
        <p className="text-slate-400 text-sm font-light">You don't have to do everything.</p>
        <p className="text-slate-500 text-xs">Take this moment just for you.</p>
      </div>

      <button
        onClick={onClose}
        className="mt-12 px-6 py-2.5 rounded-full border border-white/20 text-white/60 text-sm hover:text-white/90 hover:border-white/40 transition"
      >
        End break
      </button>
    </div>
  )
}
