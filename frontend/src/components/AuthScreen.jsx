import { useState } from 'react'
import { api } from '../api.js'
import { MOOD_COLORS } from '../constants.js'

export default function AuthScreen({ onLoggedIn, showToast }) {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signupUsername, setSignupUsername] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  async function handleLogin(e) {
    e?.preventDefault()
    if (!loginUsername.trim() || !loginPassword) {
      setError('Enter your username and password.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const token = await api('/public/login', {
        method: 'POST',
        body: { userName: loginUsername.trim(), password: loginPassword },
        auth: false
      })
      onLoggedIn(token)
    } catch (err) {
      setError(err.message || 'Incorrect username or password.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSignup(e) {
    e?.preventDefault()
    if (!signupUsername.trim() || !signupEmail.trim() || !signupPassword) {
      setError('Fill in all fields.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await api('/public/signup', {
        method: 'POST',
        body: { userName: signupUsername.trim(), email: signupEmail.trim(), password: signupPassword },
        auth: false
      })
      showToast('Account created — signing you in…', 'ok')
      setLoginUsername(signupUsername.trim())
      setLoginPassword(signupPassword)
      const token = await api('/public/login', {
        method: 'POST',
        body: { userName: signupUsername.trim(), password: signupPassword },
        auth: false
      })
      onLoggedIn(token)
    } catch (err) {
      setError(err.message || 'Could not create account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-brand">
        <div className="brand-mark"><span className="dot"></span> Inkwell</div>
        <div>
          <div className="auth-quote">
            Write it down before you fall asleep<span>.</span> Some days need a witness.
          </div>
          <div className="arc-row">
            {Object.values(MOOD_COLORS).map(c => (
              <div key={c} className="arc-dot" style={{ background: c }}></div>
            ))}
          </div>
        </div>
        <div className="auth-foot">A private space for your entries — nothing here leaves your journal.</div>
      </div>

      <div className="auth-form-wrap">
        {mode === 'login' ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <h1>Welcome back</h1>
            <p className="auth-sub">Sign in to keep writing.</p>
            {error && <div className="auth-msg error show">{error}</div>}
            <div className="field">
              <label>Username</label>
              <input autoComplete="username" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" autoComplete="current-password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            </div>
            <button className="btn-primary" disabled={loading} type="submit">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
            <div className="auth-switch">
              New here? <button type="button" onClick={() => { setMode('signup'); setError('') }}>Create an account</button>
            </div>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignup}>
            <h1>Start your ledger</h1>
            <p className="auth-sub">Takes a few seconds to set up.</p>
            {error && <div className="auth-msg error show">{error}</div>}
            <div className="field">
              <label>Username</label>
              <input autoComplete="username" value={signupUsername} onChange={e => setSignupUsername(e.target.value)} />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" autoComplete="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" autoComplete="new-password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
            </div>
            <button className="btn-primary" disabled={loading} type="submit">
              {loading ? 'Creating…' : 'Create account'}
            </button>
            <div className="auth-switch">
              Already have an account? <button type="button" onClick={() => { setMode('login'); setError('') }}>Sign in</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
