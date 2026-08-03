import { useMemo, useState } from 'react'
import { extractId } from '../api.js'
import { MOOD_COLORS, moodLabel } from '../constants.js'

export default function Sidebar({ greeting, entries, activeEntryId, onSelect, onNew, onLogout }) {
  const [query, setQuery] = useState('')

  const sorted = useMemo(
    () => [...entries].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)),
    [entries]
  )

  const filtered = useMemo(() => {
    if (!query.trim()) return sorted
    const q = query.trim().toLowerCase()
    return sorted.filter(e =>
      (e.title || '').toLowerCase().includes(q) || (e.content || '').toLowerCase().includes(q)
    )
  }, [sorted, query])

  const recentMoods = useMemo(() => sorted.slice(0, 12), [sorted])

  const usedMoods = useMemo(() => {
    const set = new Set(entries.map(e => e.sentiment).filter(Boolean))
    return Object.keys(MOOD_COLORS).filter(m => set.has(m))
  }, [entries])

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="brand-mark" style={{ fontSize: 17 }}><span className="dot"></span> Inkwell</div>
        <button className="logout-btn" onClick={onLogout}>Sign out</button>
      </div>

      <div className="greeting-card">
        <div className="g-label">Today</div>
        <div className="g-text">{greeting || 'Loading…'}</div>
      </div>

      {recentMoods.length > 0 && (
        <>
          <div className="mood-arc">
            {recentMoods.map((e, i) => (
              <div
                key={i}
                className="arc-dot"
                title={e.sentiment || 'not analyzed yet'}
                style={{ background: e.sentiment ? MOOD_COLORS[e.sentiment] : 'var(--none)' }}
              ></div>
            ))}
          </div>
          {usedMoods.length > 0 && (
            <div className="mood-legend">
              {usedMoods.map(m => (
                <span key={m} className="mood-legend-chip">
                  <span className="dot" style={{ background: MOOD_COLORS[m] }}></span>{moodLabel(m)}
                </span>
              ))}
            </div>
          )}
        </>
      )}

      <button className="new-entry-btn" onClick={onNew}>+ New entry</button>

      <input
        className="search-box"
        type="text"
        placeholder="Search entries…"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="entries-label-row">
        <span className="entries-label">Entries</span>
        <span className="entries-count">{entries.length}</span>
      </div>

      <div className="entries-list">
        {filtered.length === 0 && (
          <div className="empty-list">
            {entries.length === 0 ? 'No entries yet. Start your first one.' : 'No entries match your search.'}
          </div>
        )}
        {filtered.map(e => {
          const id = extractId(e.id)
          const dateStr = e.date ? new Date(e.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''
          const preview = (e.content || '').trim().slice(0, 60)
          return (
            <div
              key={id}
              className={`entry-item ${id === activeEntryId ? 'active' : ''}`}
              onClick={() => onSelect(id)}
            >
              <div className="mood-chip" style={{ background: e.sentiment ? MOOD_COLORS[e.sentiment] : 'var(--none)' }}></div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="ei-title">{e.title || 'Untitled'}</div>
                {preview && <div className="ei-preview">{preview}</div>}
                <div className="ei-date">{dateStr}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
