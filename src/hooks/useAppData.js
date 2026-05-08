import { useState, useEffect, useCallback } from 'react'
import { todayKey } from '../utils/dateUtils'

const STORAGE_KEY = 'makeTodayDoable'

const defaultWin = (id) => ({
  id,
  title:     '',
  tinyStep:  '',
  completed: false,
  started:   false,
})

const defaultState = () => ({
  date:    todayKey(),
  energy:  null,
  wins:    [],
  history: [],
})

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage full — silently ignore
  }
}

export function useAppData() {
  const [data, setData] = useState(() => {
    const saved = load()
    if (!saved) return defaultState()
    return { history: [], customRoutines: [], ...saved }
  })
  const [showNewDayModal, setShowNewDayModal] = useState(false)

  // Check on mount whether the date has changed
  useEffect(() => {
    const stored = load()
    if (!stored) return
    const today = todayKey()
    if (stored.date !== today) {
      setShowNewDayModal(true)
    }
  }, [])

  // Persist whenever data changes
  useEffect(() => {
    save(data)
  }, [data])

  const setEnergy = useCallback((level) => {
    setData(prev => ({ ...prev, energy: level }))
  }, [])

  const addWin = useCallback(({ title, tinyStep }) => {
    setData(prev => {
      if (prev.wins.length >= 3) return prev
      const newWin = {
        id:        Date.now(),
        title,
        tinyStep,
        completed: false,
        started:   false,
      }
      return { ...prev, wins: [...prev.wins, newWin] }
    })
  }, [])

  const updateWin = useCallback((id, patch) => {
    setData(prev => ({
      ...prev,
      wins: prev.wins.map(w => w.id === id ? { ...w, ...patch } : w),
    }))
  }, [])

  const loadRoutine = useCallback((tasks) => {
    setData(prev => ({
      ...prev,
      wins: tasks.slice(0, 3).map((t, i) => ({
        id:        Date.now() + i,
        title:     t.title,
        tinyStep:  t.tinyStep ?? '',
        completed: false,
        started:   false,
      })),
    }))
  }, [])

  const addCustomRoutine = useCallback((routine) => {
    setData(prev => ({
      ...prev,
      customRoutines: [...(prev.customRoutines ?? []), { ...routine, id: `custom-${Date.now()}`, custom: true }],
    }))
  }, [])

  const deleteCustomRoutine = useCallback((id) => {
    setData(prev => ({
      ...prev,
      customRoutines: (prev.customRoutines ?? []).filter(r => r.id !== id),
    }))
  }, [])

  const deleteWin = useCallback((id) => {
    setData(prev => ({
      ...prev,
      wins: prev.wins.filter(w => w.id !== id),
    }))
  }, [])

  const startFresh = useCallback(() => {
    setData(prev => {
      const hasContent = prev.wins.length > 0 || prev.energy !== null
      const entry = { date: prev.date, energy: prev.energy, wins: prev.wins }
      const newHistory = hasContent
        ? [entry, ...(prev.history ?? [])].slice(0, 60)
        : (prev.history ?? [])
      return { ...defaultState(), date: todayKey(), history: newHistory }
    })
    setShowNewDayModal(false)
  }, [])

  const continueYesterday = useCallback(() => {
    setData(prev => ({ ...prev, date: todayKey() }))
    setShowNewDayModal(false)
  }, [])

  const startedCount = data.wins.filter(w => w.started || w.completed).length

  return {
    data,
    showNewDayModal,
    setEnergy,
    addWin,
    updateWin,
    deleteWin,
    loadRoutine,
    addCustomRoutine,
    deleteCustomRoutine,
    startFresh,
    continueYesterday,
    startedCount,
    history:        data.history        ?? [],
    customRoutines: data.customRoutines ?? [],
  }
}
