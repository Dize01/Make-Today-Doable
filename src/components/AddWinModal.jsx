import { useState } from 'react'

export function AddWinModal({ onAdd, onClose, editWin }) {
  const [title,    setTitle]    = useState(editWin?.title    ?? '')
  const [tinyStep, setTinyStep] = useState(editWin?.tinyStep ?? '')

  function handleSubmit(e) {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    onAdd({ title: t, tinyStep: tinyStep.trim() })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 animate-slide-up">
        <h2 className="text-lg font-semibold text-stone-800 mb-1">
          {editWin ? 'Edit your win' : 'Add a win'}
        </h2>
        <p className="text-sm text-stone-400 mb-5">Keep it small and realistic.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">
              What's the win?
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Reply to important email"
              maxLength={80}
              autoFocus
              className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-sage-200 focus:border-sage-300 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">
              Tiny first step <span className="text-stone-300 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={tinyStep}
              onChange={e => setTinyStep(e.target.value)}
              placeholder="e.g. Open inbox and find the email"
              maxLength={100}
              className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-stone-800 placeholder-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-sage-200 focus:border-sage-300 transition"
            />
            <p className="mt-1.5 text-xs text-stone-400">The smallest possible action to get started.</p>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-stone-200 text-stone-500 text-sm font-medium hover:bg-stone-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 py-3 rounded-2xl bg-sage-500 text-white text-sm font-medium hover:bg-sage-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {editWin ? 'Save changes' : 'Add win'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
