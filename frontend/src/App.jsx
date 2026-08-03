import { useCallback, useEffect, useRef, useState } from 'react'
import { api, extractId } from './api.js'
import AuthScreen from './components/AuthScreen.jsx'
import Sidebar from './components/Sidebar.jsx'
import Editor from './components/Editor.jsx'
import Toast from './components/Toast.jsx'

export default function App() {
  // Token kept in memory only — never localStorage. Refreshing the page signs you out (by design).
  const [token, setToken] = useState(null)
  const [greeting, setGreeting] = useState('')
  const [entries, setEntries] = useState([])
  const [activeEntryId, setActiveEntryId] = useState(null)
  const [isNewEntry, setIsNewEntry] = useState(false)
  const [activeEntry, setActiveEntry] = useState(null)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  const showToast = useCallback((message, type = 'ok') => {
    const id = ++toastId.current
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  const dismissToast = useCallback(id => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  const logout = useCallback((message) => {
    setToken(null)
    setEntries([])
    setActiveEntryId(null)
    setActiveEntry(null)
    setGreeting('')
    if (message) showToast(message, 'error')
  }, [showToast])

  const loadGreeting = useCallback(async (tok) => {
    try {
      const text = await api('/user', { token: tok, onUnauthorized: () => logout('Session expired. Please sign in again.') })
      setGreeting(text)
    } catch {
      setGreeting('Hi there.')
    }
  }, [logout])

  const loadEntries = useCallback(async (tok) => {
    try {
      const data = await api('/journal', { token: tok, onUnauthorized: () => logout('Session expired. Please sign in again.') })
      setEntries(Array.isArray(data) ? data : [])
    } catch {
      setEntries([])
    }
  }, [logout])

  useEffect(() => {
    if (token) {
      loadGreeting(token)
      loadEntries(token)
    }
  }, [token, loadGreeting, loadEntries])

  function handleLoggedIn(tok) {
    setToken(tok)
  }

  function handleNewEntry() {
    setActiveEntryId(null)
    setIsNewEntry(true)
    setActiveEntry({ title: '', content: '', sentiment: null, date: null })
  }

  async function handleSelectEntry(id) {
    setActiveEntryId(id)
    setIsNewEntry(false)
    try {
      const entry = await api('/journal/id/' + id, { token, onUnauthorized: () => logout('Session expired. Please sign in again.') })
      setActiveEntry(entry)
    } catch {
      showToast('Could not load that entry.', 'error')
    }
  }

  async function handleSave(title, content) {
    if (!title.trim()) {
      showToast('Give your entry a title first.', 'error')
      return
    }
    setSaving(true)
    try {
      if (isNewEntry) {
        const created = await api('/journal', { method: 'POST', body: { title, content }, token })
        const newId = extractId(created.id)
        setActiveEntryId(newId)
        setIsNewEntry(false)
        await loadEntries(token)
        if (newId) await handleSelectEntry(newId)
        showToast('Entry saved.', 'ok')
      } else {
        await api('/journal/id/' + activeEntryId, { method: 'PUT', body: { title, content }, token })
        await loadEntries(token)
        await handleSelectEntry(activeEntryId)
        showToast('Entry updated.', 'ok')
      }
    } catch (err) {
      showToast(err.message || 'Could not save entry.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this entry? This cannot be undone.')) return
    try {
      await api('/journal/id/' + activeEntryId, { method: 'DELETE', token })
      setActiveEntryId(null)
      setActiveEntry(null)
      await loadEntries(token)
      showToast('Entry deleted.', 'ok')
    } catch (err) {
      showToast(err.message || 'Could not delete entry.', 'error')
    }
  }

  if (!token) {
    return (
      <>
        <AuthScreen onLoggedIn={handleLoggedIn} showToast={showToast} />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    )
  }

  return (
    <div className="app-screen">
      <Sidebar
        greeting={greeting}
        entries={entries}
        activeEntryId={activeEntryId}
        onSelect={handleSelectEntry}
        onNew={handleNewEntry}
        onLogout={() => logout()}
      />
      <Editor
        entry={activeEntry}
        isNew={isNewEntry}
        onSave={handleSave}
        onDelete={handleDelete}
        saving={saving}
      />
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
