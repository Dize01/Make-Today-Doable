import { useState, useRef } from 'react'
import { WinCard, EmptyWinSlot } from './WinCard'
import { AddWinModal } from './AddWinModal'

export function WinsSection({ wins, startedCount, onStart, onComplete, onAdd, onEdit, onDelete, onFocus }) {
  const [showModal,   setShowModal]   = useState(false)
  const [editingWin,  setEditingWin]  = useState(null)
  const [activeWinId, setActiveWinId] = useState(null)
  const [highlightLast, setHighlightLast] = useState(false)
  const highlightTimer = useRef(null)

  // Default active: the explicit choice, or the first non-completed win
  const resolvedActiveId = activeWinId ?? wins.find(w => !w.completed)?.id ?? null

  function handleStart(win) {
    setActiveWinId(win.id)
    onStart(win.id)
    onFocus(win)
  }

  function handleComplete(id) {
    // If completing the active win, clear so next win becomes default
    if (id === activeWinId) setActiveWinId(null)
    onComplete(id)
  }

  function handleAddClick() {
    if (wins.length >= 3) return
    setEditingWin(null)
    setShowModal(true)
  }

  function handleEditClick(win) {
    setEditingWin(win)
    setShowModal(true)
  }

  function handleModalAdd({ title, tinyStep }) {
    if (editingWin) {
      onEdit(editingWin.id, { title, tinyStep })
    } else {
      onAdd({ title, tinyStep })
      if (highlightTimer.current) clearTimeout(highlightTimer.current)
      setHighlightLast(true)
      highlightTimer.current = setTimeout(() => setHighlightLast(false), 1800)
    }
  }

  const slots = [0, 1, 2]

  return (
    <>
      <div className="bg-white rounded-3xl border border-stone-100 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-stone-900 text-base">Today's 3 Wins</h2>
              {wins.length > 0 && (
                <span className="text-xs bg-sage-50 text-sage-600 border border-sage-100 px-2 py-0.5 rounded-full font-medium">
                  {startedCount} of {wins.length} started
                </span>
              )}
            </div>
            <p className="text-stone-400 text-sm mt-0.5">
              Pick up to 3 things that would make today feel like a win.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-stone-300 italic font-light" style={{ fontFamily: 'Georgia, serif' }}>
              Less is more ✓
            </span>
          </div>
        </div>

        {/* Win slots */}
        <div className="space-y-3">
          {slots.map(i => {
            const win = wins[i]
            if (win) {
              return (
                <WinCard
                  key={win.id}
                  win={win}
                  index={i}
                  isActive={win.id === resolvedActiveId}
                  isNew={highlightLast && win.id === wins[wins.length - 1]?.id}
                  onStart={() => handleStart(win)}
                  onComplete={handleComplete}
                  onEdit={handleEditClick}
                  onDelete={onDelete}
                  onFocus={onFocus}
                />
              )
            }
            if (wins.length >= 3) return null
            return (
              <EmptyWinSlot
                key={`empty-${i}`}
                number={i + 1}
                onAdd={handleAddClick}
              />
            )
          })}

          {wins.length >= 3 && (
            <p className="text-center text-xs text-stone-400 pt-1">
              Three wins is enough for today 🌱
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <AddWinModal
          editWin={editingWin}
          onAdd={handleModalAdd}
          onClose={() => { setShowModal(false); setEditingWin(null) }}
        />
      )}
    </>
  )
}
