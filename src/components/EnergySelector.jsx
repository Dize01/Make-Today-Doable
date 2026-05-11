const LEVELS = [
  {
    id:    'low',
    label: 'Low',
    icon:  '🔋',
    desc:  'Taking it slow today',
    active:   'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400',
    inactive: 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50 dark:bg-stone-800 dark:border-stone-600 dark:text-stone-400 dark:hover:bg-stone-700',
  },
  {
    id:    'medium',
    label: 'Medium',
    icon:  '🙂',
    desc:  'Steady and balanced',
    active:   'bg-sage-50 border-sage-200 text-sage-700 dark:bg-sage-900/30 dark:border-sage-800 dark:text-sage-400',
    inactive: 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50 dark:bg-stone-800 dark:border-stone-600 dark:text-stone-400 dark:hover:bg-stone-700',
  },
  {
    id:    'high',
    label: 'High',
    icon:  '⚡',
    desc:  'Ready to go!',
    active:   'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400',
    inactive: 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50 dark:bg-stone-800 dark:border-stone-600 dark:text-stone-400 dark:hover:bg-stone-700',
  },
]

export function EnergySelector({ value, onChange }) {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-3xl px-5 py-4 border border-stone-100 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div className="flex-shrink-0">
        <h2 className="font-semibold text-stone-800 dark:text-stone-100 text-base">How's your energy today?</h2>
        <p className="text-stone-400 dark:text-stone-500 text-sm">This helps keep your plans realistic.</p>
      </div>

      <div className="flex gap-2 sm:flex-1 sm:justify-end">
        {LEVELS.map(({ id, label, icon, active, inactive }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={[
              'flex items-center gap-1.5 py-1.5 px-3 rounded-xl border text-xs font-medium transition-all duration-200',
              value === id ? active : inactive,
            ].join(' ')}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
