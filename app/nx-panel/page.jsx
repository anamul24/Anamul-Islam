'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('admin_token', data.token);
        router.push('/nx-panel/dashboard');
      } else if (res.status === 500) {
        setError('Server error: ADMIN_PASSWORD not set in Vercel env vars!');
      } else {
        setError('Invalid password. Try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #080810 0%, #0f0f1a 50%, #080810 100%)',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Animated grid background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Glow effect */}
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(251,191,36,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '420px',
        margin: '0 16px',
      }}>
        {/* Logo/Brand */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.05))',
            border: '1px solid rgba(251,191,36,0.3)',
            marginBottom: '20px',
            fontSize: '28px',
          }}>
            ⚡
          </div>
          <h1 style={{
            fontSize: '28px', fontWeight: '800', color: '#fff',
            margin: '0 0 8px', letterSpacing: '-0.5px',
          }}>
            Admin Portal
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>
            Anamul Islam — Portfolio CMS
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '40px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block', fontSize: '11px', fontWeight: '700',
                color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em',
                textTransform: 'uppercase', marginBottom: '10px',
              }}>
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px', color: '#fff',
                  fontSize: '15px', outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(251,191,36,0.5)';
                  e.target.style.background = 'rgba(251,191,36,0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.border = `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`;
                  e.target.style.background = 'rgba(255,255,255,0.05)';
                }}
              />
              {error && (
                <p style={{
                  color: '#f87171', fontSize: '12px',
                  marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  ⚠ {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              style={{
                width: '100%', padding: '14px',
                background: loading || !password
                  ? 'rgba(251,191,36,0.3)'
                  : 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                border: 'none', borderRadius: '12px',
                color: loading || !password ? 'rgba(255,255,255,0.4)' : '#000',
                fontSize: '14px', fontWeight: '700',
                cursor: loading || !password ? 'not-allowed' : 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '16px', height: '16px',
                    border: '2px solid rgba(0,0,0,0.3)',
                    borderTop: '2px solid #000',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    display: 'inline-block',
                  }} />
                  Authenticating...
                </>
              ) : (
                <>⚡ Access Dashboard</>
              )}
            </button>
          </form>

          <div style={{
            marginTop: '24px', paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}>
            <a href="/" style={{
              color: 'rgba(255,255,255,0.3)', fontSize: '12px',
              textDecoration: 'none',
            }}>
              ← Back to Portfolio
            </a>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center', color: 'rgba(255,255,255,0.15)',
          fontSize: '11px', marginTop: '24px',
          letterSpacing: '0.1em',
        }}>
          SECURE ADMIN ACCESS — ANAMUL ISLAM PORTFOLIO
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}
