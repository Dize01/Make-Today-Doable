import { useState } from 'react'

const ENERGY_LABEL = {
  low:    { label: 'Low energy',    icon: '🔋', cls: 'bg-blue-50 border-blue-200 text-blue-600'   },
  medium: { label: 'Medium energy', icon: '🙂', cls: 'bg-sage-50 border-sage-200 text-sage-700'   },
  high:   { label: 'High energy',   icon: '⚡', cls: 'bg-amber-50 border-amber-200 text-amber-600' },
}

const PRESET_ROUTINES = [
  {
    id:           'low-energy',
    icon:         '🌧️',
    title:        'Low Energy Day',
    description:  'For days where even small things feel heavy.',
    energy:       'low',
    focusMinutes: 15,
    tasks: [
      { title: 'Drink a glass of water',    tinyStep: 'Just walk to the kitchen'           },
      { title: 'Reply to one message',      tinyStep: 'Open the app and find it'           },
      { title: 'Clean one small thing',     tinyStep: 'Pick the nearest thing to you'      },
    ],
    microcopy: 'Tiny progress is enough today.',
    cardCls:  'bg-blue-50/40    border-blue-100',
    iconCls:  'bg-blue-100      text-blue-500',
  },
  {
    id:           'deep-focus',
    icon:         '⚡',
    title:        'Deep Focus Sprint',
    description:  'Protect your attention for one meaningful task.',
    energy:       'high',
    focusMinutes: 25,
    tasks: [
      { title: 'Pick one important thing',  tinyStep: 'Write it down first'                },
      { title: 'Silence distractions',      tinyStep: 'Phone face-down, notifications off' },
      { title: 'Focus for 25 minutes',      tinyStep: 'Just start the timer'               },
    ],
    microcopy: 'One thing done well is enough.',
    cardCls:  'bg-amber-50/40   border-amber-100',
    iconCls:  'bg-amber-100     text-amber-500',
  },
  {
    id:           'brain-fog',
    icon:         '🫧',
    title:        'Brain Fog Reset',
    description:  'When your thoughts feel noisy and scattered.',
    energy:       'low',
    focusMinutes: 5,
    tasks: [
      { title: 'Brain dump everything',     tinyStep: 'Open a note and write freely'       },
      { title: 'Pick one tiny step',        tinyStep: 'Choose the smallest possible thing' },
      { title: 'Start for just 5 minutes',  tinyStep: 'Set a timer and begin'              },
    ],
    microcopy: 'Clarity comes from starting, not waiting.',
    cardCls:  'bg-lavender-50/60 border-lavender-100',
    iconCls:  'bg-lavender-100   text-lavender-500',
  },
  {
    id:           'recovery',
    icon:         '☕',
    title:        'Recovery Day',
    description:  'A softer pace is still progress.',
    energy:       'low',
    focusMinutes: 10,
    tasks: [
      { title: 'Stretch for a few minutes', tinyStep: 'Roll your shoulders right now'      },
      { title: 'Eat something nourishing',  tinyStep: 'Whatever is easiest to grab'        },
      { title: 'One tiny task only',        tinyStep: 'The smallest thing on your mind'    },
    ],
    microcopy: 'Rest and recovery are productive too.',
    cardCls:  'bg-stone-50      border-stone-100',
    iconCls:  'bg-stone-100     text-stone-500',
  },
  {
    id:           'sunday-reset',
    icon:         '🧹',
    title:        'Sunday Reset',
    description:  'Clear a little space for the week ahead.',
    energy:       'medium',
    focusMinutes: 20,
    tasks: [
      { title: 'Start some laundry',        tinyStep: 'Just gather the clothes'            },
      { title: 'Inbox cleanup',             tinyStep: 'Archive anything older than 7 days' },
      { title: 'Tidy one surface',          tinyStep: 'Pick the messiest spot'             },
    ],
    microcopy: 'A little reset goes a long way.',
    cardCls:  'bg-sage-50/50    border-sage-100',
    iconCls:  'bg-sage-100      text-sage-600',
  },
]

const ICON_OPTIONS = ['🌱','🌿','☀️','🌙','🎯','📝','🧘','🚶','💧','🎵','📖','🛁','🌸','🧹','✉️','💪']
const FOCUS_OPTIONS = [5, 10, 15, 20, 25]

const emptyTask = () => ({ title: '', tinyStep: '' })

// ─── Create Routine Modal ────────────────────────────────────────────────────

function CreateModal({ onSave, onClose }) {
  const [icon,     setIcon]     = useState('🌱')
  const [title,    setTitle]    = useState('')
  const [desc,     setDesc]     = useState('')
  const [energy,   setEnergy]   = useState('medium')
  const [focus,    setFocus]    = useState(15)
  const [tasks,    setTasks]    = useState([emptyTask(), emptyTask(), emptyTask()])

  function setTaskField(i, field, val) {
    setTasks(prev => prev.map((t, idx) => idx === i ? { ...t, [field]: val } : t))
  }

  function handleSave(e) {
    e.preventDefault()
    const validTasks = tasks.filter(t => t.title.trim())
    if (!title.trim() || validTasks.length === 0) return
    onSave({
      icon,
      title:        title.trim(),
      description:  desc.trim(),
      energy,
      focusMinutes: focus,
      tasks:        validTasks.map(t => ({ title: t.title.trim(), tinyStep: t.tinyStep.trim() })),
      microcopy:    'You built this one yourself.',
      cardCls:      'bg-sage-50/40 border-sage-100',
      iconCls:      'bg-sage-100   text-sage-600',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm max-h-[90dvh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-stone-100">
          <h2 className="font-semibold text-stone-800 text-base">Create a routine</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-400 hover:bg-stone-100 transition text-xl">×</button>
        </div>

        <form onSubmit={handleSave} className="px-6 py-5 space-y-5">

          {/* Icon picker */}
          <div>
            <p className="text-xs text-stone-400 font-medium mb-2">Pick an icon</p>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map(em => (
                <button
                  key={em} type="button"
                  onClick={() => setIcon(em)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition border
                    ${icon === em ? 'bg-sage-100 border-sage-200' : 'bg-stone-50 border-stone-100 hover:bg-stone-100'}`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs text-stone-400 font-medium mb-1.5">Routine name</label>
            <input
              required value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Morning Kickstart"
              maxLength={50}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-200 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-stone-400 font-medium mb-1.5">Short description <span className="text-stone-300 font-normal">(optional)</span></label>
            <input
              value={desc} onChange={e => setDesc(e.target.value)}
              placeholder="When is this routine helpful?"
              maxLength={80}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-200 transition"
            />
          </div>

          {/* Tasks */}
          <div>
            <p className="text-xs text-stone-400 font-medium mb-2">Tasks (up to 3)</p>
            <div className="space-y-3">
              {tasks.map((t, i) => (
                <div key={i} className="space-y-1.5 bg-stone-50 rounded-xl p-3 border border-stone-100">
                  <input
                    value={t.title} onChange={e => setTaskField(i, 'title', e.target.value)}
                    placeholder={`Task ${i + 1}`}
                    maxLength={60}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-800 text-sm placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-200 transition"
                  />
                  <input
                    value={t.tinyStep} onChange={e => setTaskField(i, 'tinyStep', e.target.value)}
                    placeholder="Tiny first step (optional)"
                    maxLength={80}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-700 text-xs placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-sage-200 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Energy */}
          <div>
            <p className="text-xs text-stone-400 font-medium mb-2">Best for</p>
            <div className="flex gap-2">
              {(['low','medium','high']).map(lvl => {
                const b = ENERGY_LABEL[lvl]
                return (
                  <button key={lvl} type="button"
                    onClick={() => setEnergy(lvl)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-medium transition flex items-center justify-center gap-1
                      ${energy === lvl ? b.cls : 'bg-white border-stone-200 text-stone-400 hover:bg-stone-50'}`}
                  >
                    {b.icon} {b.label.split(' ')[0]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Focus time */}
          <div>
            <p className="text-xs text-stone-400 font-medium mb-2">Focus time</p>
            <div className="flex gap-2">
              {FOCUS_OPTIONS.map(min => (
                <button key={min} type="button"
                  onClick={() => setFocus(min)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-medium transition
                    ${focus === min ? 'bg-sage-50 border-sage-200 text-sage-700' : 'bg-white border-stone-200 text-stone-400 hover:bg-stone-50'}`}
                >
                  {min}m
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-2xl border border-stone-200 text-stone-500 text-sm hover:bg-stone-50 transition">
              Cancel
            </button>
            <button type="submit"
              disabled={!title.trim() || tasks.every(t => !t.title.trim())}
              className="flex-1 py-2.5 rounded-2xl bg-sage-500 text-white text-sm font-semibold hover:bg-sage-600 disabled:opacity-40 disabled:cursor-not-allowed transition">
              Save routine
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Routine Detail Modal ────────────────────────────────────────────────────

function RoutineModal({ routine, hasExistingWins, onStart, onDelete, onClose }) {
  const [confirming, setConfirming] = useState(false)
  const badge = ENERGY_LABEL[routine.energy]

  function handleStart() {
    if (hasExistingWins) setConfirming(true)
    else onStart(routine.tasks)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm animate-slide-up overflow-hidden">

        <div className={`px-6 pt-6 pb-4 ${routine.cardCls}`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${routine.iconCls}`}>
              {routine.icon}
            </div>
            <div className="flex items-center gap-1">
              {routine.custom && (
                <button onClick={() => { onDelete(routine.id); onClose() }}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-red-300 hover:bg-red-50 hover:text-red-400 transition text-sm"
                  title="Delete routine"
                >
                  🗑
                </button>
              )}
              <button onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-400 hover:bg-black/5 transition text-xl leading-none">
                ×
              </button>
            </div>
          </div>
          <p className="font-semibold text-stone-800 text-base">{routine.title}</p>
          {routine.description && <p className="text-sm text-stone-500 mt-0.5">{routine.description}</p>}
          {routine.custom && (
            <span className="inline-block mt-2 text-xs bg-white/60 border border-stone-200 text-stone-400 px-2 py-0.5 rounded-full">
              Your routine
            </span>
          )}
        </div>

        <div className="px-6 py-5 space-y-4">
          {badge && (
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${badge.cls}`}>
              {badge.icon} Best for {badge.label.toLowerCase()} days
            </span>
          )}

          <div className="space-y-2">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">Tasks</p>
            {routine.tasks.map((t, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full border border-stone-200 bg-stone-50" />
                <div>
                  <p className="text-sm text-stone-700 leading-snug">{t.title}</p>
                  {t.tinyStep && <p className="text-xs text-stone-400 mt-0.5">Start with: {t.tinyStep}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-stone-400 flex items-center gap-1.5">
            <span>⏱</span> Suggested focus: {routine.focusMinutes} min
          </div>

          {routine.microcopy && <p className="text-xs text-stone-400 italic">{routine.microcopy}</p>}
        </div>

        {confirming ? (
          <div className="px-6 pb-6 space-y-3 border-t border-stone-100 pt-4">
            <p className="text-sm text-stone-600 text-center leading-relaxed">
              You have existing wins today.<br />
              <span className="text-stone-400 text-xs">Replace them with this routine?</span>
            </p>
            <button onClick={() => onStart(routine.tasks)}
              className="w-full py-3 rounded-2xl bg-sage-500 text-white text-sm font-semibold hover:bg-sage-600 transition">
              Yes, replace my wins
            </button>
            <button onClick={() => setConfirming(false)}
              className="w-full py-2.5 rounded-2xl border border-stone-200 text-stone-500 text-sm hover:bg-stone-50 transition">
              Keep my wins
            </button>
          </div>
        ) : (
          <div className="px-6 pb-6 space-y-2">
            <button onClick={handleStart}
              className="w-full py-3 rounded-2xl bg-sage-500 text-white text-sm font-semibold hover:bg-sage-600 transition">
              Start this routine
            </button>
            <button onClick={onClose}
              className="w-full py-2.5 rounded-2xl border border-stone-200 text-stone-500 text-sm hover:bg-stone-50 transition">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Routine Card ────────────────────────────────────────────────────────────

function RoutineCard({ routine, onClick }) {
  return (
    <button onClick={() => onClick(routine)}
      className={`w-full text-left rounded-2xl border p-5 space-y-3 transition-all duration-200 group ${routine.cardCls}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${routine.iconCls}`}>
          {routine.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-stone-700 text-sm">{routine.title}</p>
            {routine.custom && (
              <span className="text-xs text-stone-400 border border-stone-200 bg-white/60 px-1.5 py-0.5 rounded-full">yours</span>
            )}
          </div>
          {routine.description && <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{routine.description}</p>}
        </div>
      </div>

      <ul className="space-y-1">
        {routine.tasks.map((t, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-stone-500">
            <span className="w-3.5 h-3.5 rounded-full border border-stone-200 bg-white flex-shrink-0" />
            {t.title}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-stone-400">⏱ {routine.focusMinutes} min focus</span>
        <span className="text-xs font-medium text-sage-600 opacity-0 group-hover:opacity-100 transition-opacity">
          View →
        </span>
      </div>
    </button>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function RoutinesPage({ existingWins = [], customRoutines = [], onStartRoutine, onAddRoutine, onDeleteRoutine }) {
  const [selected,     setSelected]     = useState(null)
  const [showCreate,   setShowCreate]   = useState(false)

  const allRoutines = [...PRESET_ROUTINES, ...customRoutines]

  function handleStart(tasks) {
    onStartRoutine(tasks)
    setSelected(null)
  }

  return (
    <>
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto w-full">

        <header className="space-y-1 pt-2">
          <p className="text-stone-400 text-sm">🌿 Gentle starting points</p>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 leading-tight tracking-tight">
                Routines for difficult days.
              </h1>
              <p className="text-stone-400 text-sm mt-1">You don't need to plan everything from scratch.</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-sage-200 bg-sage-50 text-sage-700 text-sm font-medium hover:bg-sage-100 transition"
            >
              <span>+</span> Create routine
            </button>
          </div>
        </header>

        <p className="text-xs text-stone-300 italic -mt-2">
          Starting small still counts. You can always adjust the pace.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {allRoutines.map(r => (
            <RoutineCard key={r.id} routine={r} onClick={setSelected} />
          ))}
        </div>

        <p className="text-center text-xs text-stone-300 pb-4">
          Done is enough. Rest is productive too. 🌱
        </p>
      </div>

      {selected && (
        <RoutineModal
          routine={selected}
          hasExistingWins={existingWins.length > 0}
          onStart={handleStart}
          onDelete={onDeleteRoutine}
          onClose={() => setSelected(null)}
        />
      )}

      {showCreate && (
        <CreateModal
          onSave={onAddRoutine}
          onClose={() => setShowCreate(false)}
        />
      )}
    </>
  )
}
