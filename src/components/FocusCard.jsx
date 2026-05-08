export function FocusCard({ wins, onStartFocus }) {
  const activeWin = wins.find(w => w.started && !w.completed) ?? wins.find(w => !w.completed)

  return (
    <div className="relative rounded-3xl overflow-hidden border border-stone-100 bg-gradient-to-br from-sage-50 to-emerald-50 p-6">
      {/* Decorative leaf illustration */}
      <div className="absolute bottom-0 right-0 text-8xl opacity-10 select-none pointer-events-none">
        🌿
      </div>

      <div className="flex items-start gap-3 mb-4">
        <span className="text-xl">🍃</span>
        <div>
          <h3 className="font-semibold text-stone-700 text-sm">Need to focus?</h3>
          <p className="text-xs text-stone-400 mt-0.5">
            Choose a task and start a focus session.
          </p>
        </div>
      </div>

      <button
        onClick={() => onStartFocus(activeWin ?? null)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sage-500 border border-sage-500 text-white text-sm font-medium hover:bg-sage-600 hover:border-sage-600 transition"
      >
        Start focusing 🍃
      </button>
    </div>
  )
}
