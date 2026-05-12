function tone(ctx, freq, start, duration, peak = 0.12) {
  const osc  = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(peak, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  osc.start(start)
  osc.stop(start + duration + 0.05)
}

function ctx() {
  return new (window.AudioContext || window.webkitAudioContext)()
}

// Two-note rising chime — completing a win
export function playWinComplete() {
  try {
    const c = ctx(), now = c.currentTime
    tone(c, 523, now,        0.3, 0.12)  // C5
    tone(c, 784, now + 0.15, 0.4, 0.10) // G5
  } catch {}
}

// Single soft ping — task added
export function playTaskAdded() {
  try {
    const c = ctx(), now = c.currentTime
    tone(c, 587, now, 0.25, 0.09) // D5
  } catch {}
}

// Gentle ascending three-note chime — timer done
export function playTimerDone() {
  try {
    const c = ctx(), now = c.currentTime
    tone(c, 523, now,        0.5, 0.10) // C5
    tone(c, 659, now + 0.22, 0.5, 0.09) // E5
    tone(c, 784, now + 0.44, 0.7, 0.08) // G5
  } catch {}
}
