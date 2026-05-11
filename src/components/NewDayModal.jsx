export function NewDayModal({ onStartFresh, onContinue }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-stone-800 rounded-3xl w-full max-w-sm p-8 text-center animate-slide-up">
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-sage-100 dark:bg-sage-900/40 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#5a8a5a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M12 22V12" />
              <path d="M12 12C12 12 7 10 5 6c4 0 7 2 7 6z" />
              <path d="M12 12C12 12 17 10 19 6c-4 0-7 2-7 6z" />
              <path d="M12 17C12 17 8 15.5 6 12c4 0 6 2 6 5z" />
              <path d="M12 17C12 17 16 15.5 18 12c-4 0-6 2-6 5z" />
            </svg>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2">
          A new day has arrived
        </h2>
        <p className="text-sm text-stone-400 dark:text-stone-500 leading-relaxed mb-8">
          Would you like to start fresh today, or carry on from where you left off?
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onStartFresh}
            className="w-full py-3.5 rounded-2xl bg-sage-500 text-white text-sm font-semibold hover:bg-sage-600 transition"
          >
            Start fresh 🌱
          </button>
          <button
            onClick={onContinue}
            className="w-full py-3.5 rounded-2xl border border-stone-200 dark:border-stone-600 text-stone-500 dark:text-stone-400 text-sm font-medium hover:bg-stone-50 dark:hover:bg-stone-700 transition"
          >
            Continue yesterday
          </button>
        </div>

        <p className="text-xs text-stone-300 dark:text-stone-600 mt-5">Either choice is perfectly okay.</p>
      </div>
    </div>
  )
}
