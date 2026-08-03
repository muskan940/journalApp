import { useEffect, useState } from 'react'
import { MOOD_COLORS, moodLabel } from '../constants.js'

function EmptyState() {
  return (
    <div className="main-empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      <div className="big">Nothing selected</div>
      <div className="small">Pick an entry, or start a new one.</div>
    </div>
  )
}

export default function Editor({ entry, isNew, onSave, onDelete, saving }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setTitle(entry?.title || '')
    setContent(entry?.content || '')
  }, [entry, isNew])

  if (!entry) return <div className="main"><EmptyState /></div>

  const accent = entry.sentiment ? MOOD_COLORS[entry.sentiment] : 'var(--brass)'
  const dateStr = entry.date
    ? new Date(entry.date).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })
    : 'Not saved yet'
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="main">
      <div className="editor-scroll">
        <div className="editor" style={{ '--editor-accent': accent }}>
          <div className="editor-top">
            <div className="editor-meta">
              <div className="date-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {dateStr}
              </div>
              {entry.sentiment ? (
                <div className="sentiment-badge">
                  <span className="dot" style={{ background: MOOD_COLORS[entry.sentiment], color: MOOD_COLORS[entry.sentiment] }}></span>
                  {moodLabel(entry.sentiment)}
                </div>
              ) : (!isNew && <div className="sentiment-badge">not analyzed yet</div>)}
            </div>
            <div className="editor-actions">
              {!isNew && <button className="icon-btn danger" onClick={onDelete}>Delete</button>}
              <button className="icon-btn save" disabled={saving} onClick={() => onSave(title, content)}>
                {saving ? 'Saving…' : 'Save entry'}
              </button>
            </div>
          </div>

          <input
            className="title-input"
            placeholder="Entry title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className="editor-divider"><span className="mark"></span></div>
          <textarea
            className="content-input"
            placeholder="Write what's on your mind…"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="editor-footer">
            <span>{wordCount} word{wordCount === 1 ? '' : 's'}</span>
            <span>{isNew ? 'Draft — not saved yet' : 'Saved'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
