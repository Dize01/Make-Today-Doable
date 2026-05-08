export function OverwhelmedCard({ onBreak }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-stone-100 bg-gradient-to-br from-lavender-50 to-purple-50 p-6">
      {/* Decorative cup illustration */}
      <div className="absolute bottom-0 right-0 text-7xl opacity-20 select-none pointer-events-none pr-2 pb-1">
        ☕
      </div>

      <div className="flex items-start gap-3 mb-4">
        <span className="text-xl">💜</span>
        <div>
          <h3 className="font-semibold text-stone-700 text-sm">Too much on your mind?</h3>
          <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
            A short pause breaks the loop better than pushing through.
          </p>
        </div>
      </div>

      <button
        onClick={onBreak}
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-lavender-200 text-stone-600 text-sm font-medium hover:bg-white transition"
      >
        Do a 2-minute reset
        <span className="text-base">☕</span>
      </button>
    </div>
  )
}
