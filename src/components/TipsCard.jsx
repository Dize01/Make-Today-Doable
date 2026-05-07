const TIPS = [
  { icon: '⏳', text: 'Start with one tiny step'             },
  { icon: '🎯', text: 'Focus on progress, not perfection'    },
  { icon: '⏸️', text: 'Take breaks — you deserve them'       },
  { icon: '✅', text: 'Not today is okay'                    },
]

export function TipsCard() {
  return (
    <div className="bg-white rounded-3xl shadow-soft border border-stone-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">💡</span>
        <h3 className="font-semibold text-stone-700 text-sm">Tips for today</h3>
      </div>
      <ul className="space-y-3">
        {TIPS.map(({ icon, text }) => (
          <li key={text} className="flex items-start gap-2.5">
            <span className="text-sm mt-0.5 w-5 flex-shrink-0">{icon}</span>
            <span className="text-xs text-stone-500 leading-relaxed">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SmallStillCountsCard() {
  return (
    <div className="bg-white rounded-3xl shadow-soft border border-stone-100 p-5 flex items-start gap-3">
      <div className="text-3xl flex-shrink-0">🌤️</div>
      <div>
        <p className="text-sm font-semibold text-stone-700">Small still counts.</p>
        <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
          You're showing up and that matters.
        </p>
      </div>
    </div>
  )
}

export function YouGotThisButton() {
  return (
    <button className="w-full py-3 rounded-2xl bg-amber-50 border border-amber-100 text-amber-800 text-sm font-semibold hover:bg-amber-100 transition-all duration-200 shadow-softer">
      You got this 🤎
    </button>
  )
}
