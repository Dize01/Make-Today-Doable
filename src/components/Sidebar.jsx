import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'today',    label: 'Today',    icon: HomeIcon    },
  { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
  { id: 'history',  label: 'History',  icon: ClockIcon   },
  { id: 'routines', label: 'Routines', icon: StarIcon    },
]

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="12" r="9"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3"/>
    </svg>
  )
}
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
    </svg>
  )
}
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <circle cx="12" cy="12" r="4"/>
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export function Sidebar({ activeNav, onNavChange, isMobileOpen, onMobileClose, dark, onToggleDark }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={[
          'fixed top-0 left-0 h-full z-30 flex flex-col',
          'w-56 bg-stone-50 dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800',
          'transition-transform duration-300',
          'lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:z-auto',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-6 border-b border-stone-100 dark:border-stone-800">
          <div className="w-9 h-9 rounded-2xl bg-sage-100 dark:bg-sage-900/40 flex items-center justify-center text-xl">
            🌱
          </div>
          <div className="leading-tight flex-1">
            <div className="font-semibold text-stone-800 dark:text-stone-100 text-sm">Make Today</div>
            <div className="font-semibold text-stone-800 dark:text-stone-100 text-sm">Doable</div>
          </div>
          <button
            onClick={onToggleDark}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-7 h-7 flex items-center justify-center rounded-xl text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-600 dark:hover:text-stone-300 transition"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activeNav === id
            return (
              <button
                key={id}
                onClick={() => { onNavChange(id); onMobileClose?.() }}
                className={[
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-sage-100 dark:bg-sage-900/40 text-sage-700 dark:text-sage-400'
                    : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200',
                ].join(' ')}
              >
                <Icon />
                {label}
              </button>
            )
          })}
        </nav>

        {/* Motivational bottom card */}
        <div className="mx-3 mb-3 p-4 rounded-2xl bg-sage-50 dark:bg-sage-900/20 border border-sage-100 dark:border-sage-900">
          <p className="text-xs font-semibold text-sage-700 dark:text-sage-400 mb-1">Not today is okay.</p>
          <p className="text-xs text-sage-600 dark:text-sage-500 leading-relaxed">You can only do what you can do.</p>
          <div className="mt-3 flex justify-center text-2xl">🌱</div>
        </div>

        {/* Legal links */}
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap px-2">
          <button onClick={() => { onNavChange('privacy'); onMobileClose?.() }} className="text-xs text-stone-300 dark:text-stone-600 hover:text-stone-400 dark:hover:text-stone-400 transition">Privacy</button>
          <span className="text-stone-200 dark:text-stone-700 text-xs">·</span>
          <button onClick={() => { onNavChange('release'); onMobileClose?.() }} className="text-xs text-stone-300 dark:text-stone-600 hover:text-stone-400 dark:hover:text-stone-400 transition">Release Notes</button>
          <span className="text-stone-200 dark:text-stone-700 text-xs">·</span>
          <button onClick={() => { onNavChange('terms'); onMobileClose?.() }} className="text-xs text-stone-300 dark:text-stone-600 hover:text-stone-400 dark:hover:text-stone-400 transition">Terms</button>
        </div>
      </aside>
    </>
  )
}
