const RELEASES = [
  {
    version: 'v1.5',
    date: 'May 2026',
    label: 'Gentle Sound Feedback',
    changes: [
      'Soft two-note chime when you complete a win — a small reward for a real effort',
      'Quiet ping when a task is added — gentle confirmation, nothing jarring',
      'Calming three-note chime when your focus timer finishes',
      'All sounds use the Web Audio API — no files, no loading, works offline',
    ],
  },
  {
    version: 'v1.4',
    date: 'May 2026',
    label: 'Dark Mode & Release Notes',
    changes: [
      'Dark mode — toggle in the sidebar, respects system preference',
      'Release Notes page (you\'re reading it!)',
      'Reactivate a completed task via Undo or clicking the ✓ circle',
      'Pulse animation when a new task is added',
    ],
  },
  {
    version: 'v1.3',
    date: 'May 2026',
    label: 'Polish & Mobile',
    changes: [
      'Mobile-responsive energy selector — stacks vertically on small screens',
      'Mobile-responsive task cards — action buttons move below the title',
      'Flat design — removed all shadows for a calmer, cleaner look',
      'Subtle visual hierarchy improvements across all sections',
      '"Too much on your mind?" card — more operational, less decorative',
      'Privacy Policy and Terms & Conditions pages',
      'SEO improvements — meta tags, Open Graph, structured data',
      'PWA — installable on Android home screen',
    ],
  },
  {
    version: 'v1.2',
    date: 'May 2026',
    label: 'Custom Routines & Wins',
    changes: [
      'Create your own custom routines with icon, tasks, and focus time',
      'Delete custom routines from the detail view',
      'Done button on each task card for quick completion',
      'Undo a completed task — click the ✓ circle or the Undo link',
      'One active task at a time — green left border follows your focus',
      'Confirmation prompt before replacing today\'s wins with a routine',
    ],
  },
  {
    version: 'v1.1',
    date: 'May 2026',
    label: 'Pages Update',
    changes: [
      'History page — view past days with energy and completion summary',
      'Calendar page — monthly view with plant growth icons (🌱 🌿 🌳)',
      'Routines page — 5 preset routines for different energy levels',
      'Sidebar navigation with Today, Calendar, History, and Routines',
    ],
  },
  {
    version: 'v1.0',
    date: 'May 2026',
    label: 'Launch',
    changes: [
      '3 Wins — pick up to 3 small tasks that would make today feel like a win',
      'Tiny first step — break each task down to its smallest possible action',
      'Energy selector — Low, Medium, or High to keep plans realistic',
      'Start focusing — full-screen focus session with optional timer',
      '2-minute reset — breathing exercise when things feel like too much',
      'New Day — archive the day and start fresh with a clean slate',
      'All data stays local — nothing leaves your device',
    ],
  },
]

export function ReleaseNotesPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto w-full">

      <header className="space-y-1 pt-2">
        <p className="text-stone-400 dark:text-stone-500 text-sm">📋 What's changed</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 dark:text-stone-100 leading-tight tracking-tight">
          Release Notes
        </h1>
        <p className="text-stone-400 dark:text-stone-500 text-sm">
          Every update is a small step toward something better.
        </p>
      </header>

      <div className="space-y-6">
        {RELEASES.map((release) => (
          <div key={release.version} className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 p-5 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold bg-sage-100 dark:bg-sage-900/40 text-sage-700 dark:text-sage-400 px-2.5 py-1 rounded-full">
                {release.version}
              </span>
              <span className="font-semibold text-stone-800 dark:text-stone-100 text-sm">{release.label}</span>
              <span className="text-xs text-stone-300 dark:text-stone-600 ml-auto">{release.date}</span>
            </div>
            <ul className="space-y-1.5">
              {release.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-300">
                  <span className="text-sage-400 mt-0.5 flex-shrink-0">✓</span>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-stone-300 dark:text-stone-600 pb-4">
        Built with care, one small step at a time. 🌱
      </p>
    </div>
  )
}
