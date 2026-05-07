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
  date:   todayKey(),
  energy: null,
  wins:   [],
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
  const [data, setData] = useState(() => load() ?? defaultState())
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

  const deleteWin = useCallback((id) => {
    setData(prev => ({
      ...prev,
      wins: prev.wins.filter(w => w.id !== id),
    }))
  }, [])

  const startFresh = useCallback(() => {
    const fresh = { ...defaultState(), date: todayKey() }
    setData(fresh)
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
    startFresh,
    continueYesterday,
    startedCount,
  }
}
