const LEVELS = [
  {
    id:    'low',
    label: 'Low',
    icon:  '🔋',
    desc:  'Taking it slow today',
    active:   'bg-blue-50 border-blue-200 text-blue-700 shadow-softer',
    inactive: 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50',
  },
  {
    id:    'medium',
    label: 'Medium',
    icon:  '🙂',
    desc:  'Steady and balanced',
    active:   'bg-sage-50 border-sage-200 text-sage-700 shadow-softer',
    inactive: 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50',
  },
  {
    id:    'high',
    label: 'High',
    icon:  '⚡',
    desc:  'Ready to go!',
    active:   'bg-amber-50 border-amber-200 text-amber-700 shadow-softer',
    inactive: 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50',
  },
]

export function EnergySelector({ value, onChange }) {
  return (
    <div className="bg-white rounded-3xl shadow-soft p-6 border border-stone-100">
      <h2 className="font-semibold text-stone-800 text-base mb-0.5">How's your energy today?</h2>
      <p className="text-stone-400 text-sm mb-5">This helps keep your plans realistic.</p>

      <div className="flex gap-3">
        {LEVELS.map(({ id, label, icon, active, inactive }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={[
              'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border text-sm font-medium transition-all duration-200',
              value === id ? active : inactive,
            ].join(' ')}
          >
            <span className="text-base">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
