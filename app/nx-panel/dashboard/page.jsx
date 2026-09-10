'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ── Icons (inline SVG to avoid extra deps) ────────────────────────────────────
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const Icons = {
  home:    'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  user:    'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  folder:  'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
  clock:   'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2',
  layers:  'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5',
  award:   'M12 2a10 10 0 1 0 0 14A10 10 0 0 0 12 2z M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32',
  plus:    'M12 5v14 M5 12h14',
  trash:   'M3 6h18 M19 6l-1 14H6L5 6 M8 6V4h8v2',
  edit:    'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  save:    'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8',
  logout:  'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
  check:   'M20 6L9 17l-5-5',
  x:       'M18 6L6 18 M6 6l12 12',
  eye:     'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  cpu:     'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 8v8 M8 12h8',
  upload:  'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
  image:   'M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8.56 12.32A2 2 0 1 0 11 9a2 2 0 0 0-2.44 3.32z M21 15l-5-5L5 21',
  copy:    'M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
};

// ── Styles helpers ─────────────────────────────────────────────────────────────
const S = {
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '24px',
  },
  input: {
    width: '100%', padding: '10px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#fff',
    fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', marginTop: '6px',
    fontFamily: 'inherit',
  },
  textarea: {
    width: '100%', padding: '10px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#fff',
    fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', marginTop: '6px',
    fontFamily: 'inherit', resize: 'vertical', minHeight: '90px',
  },
  label: {
    display: 'block', fontSize: '11px', fontWeight: '700',
    color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  btnPrimary: {
    padding: '10px 20px',
    background: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
    border: 'none', borderRadius: '10px',
    color: '#000', fontSize: '13px', fontWeight: '700',
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
  },
  btnDanger: {
    padding: '8px 14px',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '8px', color: '#f87171',
    fontSize: '12px', fontWeight: '600', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '4px',
  },
  btnGhost: {
    padding: '8px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px', color: 'rgba(255,255,255,0.6)',
    fontSize: '12px', fontWeight: '600', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '4px',
  },
  sectionTitle: {
    fontSize: '22px', fontWeight: '800', color: '#fff',
    margin: '0 0 4px', letterSpacing: '-0.3px',
  },
  sectionSub: {
    fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: '0 0 24px',
  },
  fieldGroup: { marginBottom: '16px' },
};

// ── Toast ──────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
      padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px',
      background: type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
      border: `1px solid ${type === 'success' ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`,
      color: type === 'success' ? '#4ade80' : '#f87171',
      fontSize: '14px', fontWeight: '600',
      backdropFilter: 'blur(12px)',
      animation: 'slideIn 0.3s ease',
    }}>
      {type === 'success' ? '✓' : '✗'} {msg}
    </div>
  );
}

// ── Confirm Dialog ─────────────────────────────────────────────────────────────
function ConfirmDialog({ msg, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onCancel}>
      <div style={{
        background: '#12121e', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px', padding: '32px', maxWidth: '400px', width: '90%',
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ color: '#fff', margin: '0 0 8px', fontSize: '18px' }}>Confirm Delete</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0 0 24px', fontSize: '14px' }}>{msg}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={S.btnGhost}>Cancel</button>
          <button onClick={onConfirm} style={{ ...S.btnDanger, padding: '10px 20px' }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── HERO Section Editor ────────────────────────────────────────────────────────
function HeroEditor({ token, showToast }) {
  const [data, setData] = useState({ roles: [], name: '', scrollHint: '' });
  const [newRole, setNewRole] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/data?section=hero').then(r => r.json()).then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/data?section=hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    showToast(d.success ? 'Hero saved!' : d.error, d.success ? 'success' : 'error');
    setSaving(false);
  };

  const addRole = () => {
    if (!newRole.trim()) return;
    setData(p => ({ ...p, roles: [...p.roles, newRole.toUpperCase().trim()] }));
    setNewRole('');
  };

  const removeRole = (i) => setData(p => ({ ...p, roles: p.roles.filter((_, idx) => idx !== i) }));

  const moveRole = (i, dir) => {
    const arr = [...data.roles];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setData(p => ({ ...p, roles: arr }));
  };

  return (
    <div>
      <h2 style={S.sectionTitle}>Hero Section</h2>
      <p style={S.sectionSub}>Typing animation roles shown on the homepage</p>

      <div style={S.card}>
        <div style={S.fieldGroup}>
          <label style={S.label}>Your Name</label>
          <input style={S.input} value={data.name} onChange={e => setData(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div style={S.fieldGroup}>
          <label style={S.label}>Scroll Hint Text</label>
          <input style={S.input} value={data.scrollHint} onChange={e => setData(p => ({ ...p, scrollHint: e.target.value }))} />
        </div>

        <div style={S.fieldGroup}>
          <label style={S.label}>Typing Roles (drag to reorder)</label>
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.roles.map((role, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px', background: 'rgba(251,191,36,0.05)',
                border: '1px solid rgba(251,191,36,0.15)', borderRadius: '10px',
              }}>
                <span style={{ flex: 1, color: '#fbbf24', fontWeight: '700', fontSize: '13px', letterSpacing: '0.1em' }}>{role}</span>
                {i === 0 && <span style={{ fontSize: '10px', color: '#fbbf24', background: 'rgba(251,191,36,0.1)', padding: '2px 8px', borderRadius: '20px', border: '1px solid rgba(251,191,36,0.3)' }}>FIRST</span>}
                <button onClick={() => moveRole(i, -1)} disabled={i === 0} style={{ ...S.btnGhost, padding: '4px 8px', opacity: i === 0 ? 0.3 : 1 }}>↑</button>
                <button onClick={() => moveRole(i, 1)} disabled={i === data.roles.length - 1} style={{ ...S.btnGhost, padding: '4px 8px', opacity: i === data.roles.length - 1 ? 0.3 : 1 }}>↓</button>
                <button onClick={() => removeRole(i)} style={S.btnDanger}><Icon d={Icons.x} size={14} /></button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <input
              style={{ ...S.input, margin: 0 }}
              placeholder="Add new role (e.g. NETWORK ENGINEER)"
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addRole()}
            />
            <button onClick={addRole} style={{ ...S.btnPrimary, whiteSpace: 'nowrap' }}>
              <Icon d={Icons.plus} size={14} /> Add
            </button>
          </div>
        </div>

        <button onClick={save} disabled={saving} style={{ ...S.btnPrimary, marginTop: '8px' }}>
          <Icon d={Icons.save} size={14} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

// ── ABOUT Section Editor ───────────────────────────────────────────────────────
function AboutEditor({ token, showToast }) {
  const [data, setData] = useState({ tagline: '', heading: '', headingHighlight: '', bio: '', stats: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/data?section=about').then(r => r.json()).then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/data?section=about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    showToast(d.success ? 'About saved!' : d.error, d.success ? 'success' : 'error');
    setSaving(false);
  };

  const updateStat = (i, field, val) => {
    const stats = [...data.stats];
    stats[i] = { ...stats[i], [field]: val };
    setData(p => ({ ...p, stats }));
  };

  const addStat = () => setData(p => ({ ...p, stats: [...p.stats, { value: '', label: '' }] }));
  const removeStat = (i) => setData(p => ({ ...p, stats: p.stats.filter((_, idx) => idx !== i) }));

  return (
    <div>
      <h2 style={S.sectionTitle}>About Section</h2>
      <p style={S.sectionSub}>Bio text and stats cards shown in the about section</p>

      <div style={{ ...S.card, marginBottom: '16px' }}>
        <h3 style={{ color: '#fbbf24', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px' }}>Content</h3>
        <div style={S.fieldGroup}>
          <label style={S.label}>Tagline (small text above heading)</label>
          <input style={S.input} value={data.tagline} onChange={e => setData(p => ({ ...p, tagline: e.target.value }))} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={S.fieldGroup}>
            <label style={S.label}>Heading</label>
            <input style={S.input} value={data.heading} onChange={e => setData(p => ({ ...p, heading: e.target.value }))} />
          </div>
          <div style={S.fieldGroup}>
            <label style={S.label}>Highlighted Word</label>
            <input style={S.input} value={data.headingHighlight} onChange={e => setData(p => ({ ...p, headingHighlight: e.target.value }))} />
          </div>
        </div>
        <div style={S.fieldGroup}>
          <label style={S.label}>Bio / Description</label>
          <textarea style={{ ...S.textarea, minHeight: '160px' }} value={data.bio} onChange={e => setData(p => ({ ...p, bio: e.target.value }))} />
        </div>
        <button onClick={save} disabled={saving} style={S.btnPrimary}>
          <Icon d={Icons.save} size={14} /> {saving ? 'Saving...' : 'Save Content'}
        </button>
      </div>

      <div style={S.card}>
        <h3 style={{ color: '#fbbf24', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px' }}>Stats Cards</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.stats.map((stat, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'end',
              padding: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px',
            }}>
              <div>
                <label style={S.label}>Value</label>
                <input style={{ ...S.input, marginTop: '6px' }} value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="e.g. CCNA" />
              </div>
              <div>
                <label style={S.label}>Label</label>
                <input style={{ ...S.input, marginTop: '6px' }} value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="e.g. In Progress" />
              </div>
              <button onClick={() => removeStat(i)} style={S.btnDanger}><Icon d={Icons.trash} size={14} /></button>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          <button onClick={addStat} style={S.btnGhost}><Icon d={Icons.plus} size={14} /> Add Stat</button>
          <button onClick={save} disabled={saving} style={S.btnPrimary}>
            <Icon d={Icons.save} size={14} /> {saving ? 'Saving...' : 'Save Stats'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PROJECTS Editor ────────────────────────────────────────────────────────────
function ProjectsEditor({ token, showToast }) {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    fetch('/api/admin/data?section=projects').then(r => r.json()).then(setProjects);
  }, []);

  const save = async (list) => {
    setSaving(true);
    const res = await fetch('/api/admin/data?section=projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(list || projects),
    });
    const d = await res.json();
    showToast(d.success ? 'Projects saved!' : d.error, d.success ? 'success' : 'error');
    setSaving(false);
  };

  const blank = () => ({
    id: `project-${Date.now()}`, title: '', description: '', longDescription: '',
    tags: [], link: '', github: '', size: 'small', image: '', category: 'web',
  });

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    save(updated);
    setConfirm(null);
  };

  if (editing) {
    const update = (field, val) => setEditing(p => ({ ...p, [field]: val }));
    const saveEdit = () => {
      const exists = projects.find(p => p.id === editing.id);
      const updated = exists ? projects.map(p => p.id === editing.id ? editing : p) : [...projects, editing];
      setProjects(updated);
      save(updated);
      setEditing(null);
    };

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => setEditing(null)} style={S.btnGhost}>← Back</button>
          <h2 style={{ ...S.sectionTitle, margin: 0 }}>{editing.title || 'New Project'}</h2>
        </div>
        <div style={S.card}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={S.fieldGroup}>
              <label style={S.label}>Title</label>
              <input style={S.input} value={editing.title} onChange={e => update('title', e.target.value)} />
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>Category</label>
              <select style={{ ...S.input, cursor: 'pointer' }} value={editing.category} onChange={e => update('category', e.target.value)}>
                <option value="web">Web</option>
                <option value="networking">Networking</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>Live Link</label>
              <input style={S.input} value={editing.link} onChange={e => update('link', e.target.value)} placeholder="https://" />
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>GitHub Link</label>
              <input style={S.input} value={editing.github} onChange={e => update('github', e.target.value)} placeholder="https://github.com/" />
            </div>
          <ImageUploadField
            label="Image Path"
            value={editing.image}
            onChange={v => update('image', v)}
            token={token}
            showToast={showToast}
          />
            <div style={S.fieldGroup}>
              <label style={S.label}>Card Size</label>
              <select style={{ ...S.input, cursor: 'pointer' }} value={editing.size} onChange={e => update('size', e.target.value)}>
                <option value="large">Large (2 columns)</option>
                <option value="small">Small (1 column)</option>
              </select>
            </div>
          </div>
          <div style={S.fieldGroup}>
            <label style={S.label}>Tags (comma separated)</label>
            <input style={S.input} value={editing.tags.join(', ')} onChange={e => update('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} placeholder="React, Node.js, MongoDB" />
          </div>
          <div style={S.fieldGroup}>
            <label style={S.label}>Short Description</label>
            <textarea style={S.textarea} value={editing.description} onChange={e => update('description', e.target.value)} />
          </div>
          <div style={S.fieldGroup}>
            <label style={S.label}>Long Description (modal)</label>
            <textarea style={{ ...S.textarea, minHeight: '140px' }} value={editing.longDescription} onChange={e => update('longDescription', e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={saveEdit} disabled={saving} style={S.btnPrimary}>
              <Icon d={Icons.save} size={14} /> {saving ? 'Saving...' : 'Save Project'}
            </button>
            <button onClick={() => setEditing(null)} style={S.btnGhost}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={S.sectionTitle}>Projects</h2>
          <p style={S.sectionSub}>Manage portfolio projects shown in the bento grid</p>
        </div>
        <button onClick={() => setEditing(blank())} style={S.btnPrimary}>
          <Icon d={Icons.plus} size={14} /> Add Project
        </button>
      </div>

      {confirm && (
        <ConfirmDialog
          msg={`Delete "${confirm.title}"? This cannot be undone.`}
          onConfirm={() => deleteProject(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {projects.map(p => (
          <div key={p.id} style={{
            ...S.card, padding: '18px 24px',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
              background: p.category === 'networking' ? 'rgba(99,102,241,0.15)' : 'rgba(251,191,36,0.1)',
              border: `1px solid ${p.category === 'networking' ? 'rgba(99,102,241,0.3)' : 'rgba(251,191,36,0.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px',
            }}>
              {p.category === 'networking' ? '🌐' : '💻'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>{p.title}</span>
                <span style={{
                  fontSize: '10px', padding: '2px 8px', borderRadius: '20px', fontWeight: '700',
                  background: p.size === 'large' ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.05)',
                  color: p.size === 'large' ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${p.size === 'large' ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  textTransform: 'uppercase',
                }}>{p.size}</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.description || 'No description'}
              </p>
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => setEditing(p)} style={S.btnGhost}><Icon d={Icons.edit} size={14} /></button>
              <button onClick={() => setConfirm(p)} style={S.btnDanger}><Icon d={Icons.trash} size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── EXPERIENCE Editor ──────────────────────────────────────────────────────────
function ExperienceEditor({ token, showToast }) {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editType, setEditType] = useState('exp');

  useEffect(() => {
    fetch('/api/admin/data?section=experience').then(r => r.json()).then(setExperience);
    fetch('/api/admin/data?section=education').then(r => r.json()).then(setEducation);
  }, []);

  const save = async () => {
    setSaving(true);
    await Promise.all([
      fetch('/api/admin/data?section=experience', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(experience) }),
      fetch('/api/admin/data?section=education', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token }, body: JSON.stringify(education) }),
    ]);
    showToast('Experience & Education saved!', 'success');
    setSaving(false);
  };

  const ItemCard = ({ item, onEdit, onRemove, fields }) => (
    <div style={{
      ...S.card, padding: '18px',
      display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '10px',
    }}>
      <div style={{ flex: 1 }}>
        <span style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>{item[fields.title]}</span>
        <div style={{ color: '#fbbf24', fontSize: '12px', marginTop: '2px' }}>{item[fields.sub]}</div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '2px' }}>{item.period}</div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onEdit} style={S.btnGhost}><Icon d={Icons.edit} size={14} /></button>
        <button onClick={onRemove} style={S.btnDanger}><Icon d={Icons.trash} size={14} /></button>
      </div>
    </div>
  );

  if (editing) {
    const isExp = editType === 'exp';
    const update = (f, v) => setEditing(p => ({ ...p, [f]: v }));
    const saveEdit = () => {
      if (isExp) {
        const exists = experience.find(e => e.id === editing.id);
        setExperience(exists ? experience.map(e => e.id === editing.id ? editing : e) : [...experience, editing]);
      } else {
        const exists = education.find(e => e.id === editing.id);
        setEducation(exists ? education.map(e => e.id === editing.id ? editing : e) : [...education, editing]);
      }
      setEditing(null);
    };
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => setEditing(null)} style={S.btnGhost}>← Back</button>
          <h2 style={{ ...S.sectionTitle, margin: 0 }}>{isExp ? 'Experience' : 'Education'} Entry</h2>
        </div>
        <div style={S.card}>
          {isExp ? (
            <>
              <div style={S.fieldGroup}><label style={S.label}>Title</label><input style={S.input} value={editing.title || ''} onChange={e => update('title', e.target.value)} /></div>
              <div style={S.fieldGroup}><label style={S.label}>Company / Source</label><input style={S.input} value={editing.company || ''} onChange={e => update('company', e.target.value)} /></div>
              <div style={S.fieldGroup}><label style={S.label}>Period</label><input style={S.input} value={editing.period || ''} onChange={e => update('period', e.target.value)} placeholder="2025 - Present" /></div>
              <div style={S.fieldGroup}><label style={S.label}>Description</label><textarea style={S.textarea} value={editing.description || ''} onChange={e => update('description', e.target.value)} /></div>
              <div style={S.fieldGroup}><label style={S.label}>Milestones (comma separated)</label><input style={S.input} value={(editing.milestones || []).join(', ')} onChange={e => update('milestones', e.target.value.split(',').map(m => m.trim()).filter(Boolean))} /></div>
            </>
          ) : (
            <>
              <div style={S.fieldGroup}><label style={S.label}>Degree</label><input style={S.input} value={editing.degree || ''} onChange={e => update('degree', e.target.value)} /></div>
              <div style={S.fieldGroup}><label style={S.label}>School</label><input style={S.input} value={editing.school || ''} onChange={e => update('school', e.target.value)} /></div>
              <div style={S.fieldGroup}><label style={S.label}>Period</label><input style={S.input} value={editing.period || ''} onChange={e => update('period', e.target.value)} /></div>
              <div style={S.fieldGroup}><label style={S.label}>Description</label><textarea style={S.textarea} value={editing.description || ''} onChange={e => update('description', e.target.value)} /></div>
            </>
          )}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={saveEdit} style={S.btnPrimary}><Icon d={Icons.save} size={14} /> Save</button>
            <button onClick={save} style={S.btnGhost} disabled={saving}><Icon d={Icons.check} size={14} /> {saving ? 'Writing...' : 'Commit to File'}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={S.sectionTitle}>Experience & Education</h2>
      <p style={S.sectionSub}>Timeline entries shown in the experience section</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ color: '#fbbf24', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Experience</h3>
            <button onClick={() => { setEditType('exp'); setEditing({ id: `exp-${Date.now()}`, title: '', company: '', period: '', description: '', milestones: [] }); }} style={S.btnGhost}><Icon d={Icons.plus} size={14} /></button>
          </div>
          {experience.map(exp => (
            <ItemCard key={exp.id} item={exp} fields={{ title: 'title', sub: 'company' }}
              onEdit={() => { setEditType('exp'); setEditing(exp); }}
              onRemove={() => setExperience(experience.filter(e => e.id !== exp.id))}
            />
          ))}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ color: '#818cf8', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Education</h3>
            <button onClick={() => { setEditType('edu'); setEditing({ id: `edu-${Date.now()}`, degree: '', school: '', period: '', description: '' }); }} style={S.btnGhost}><Icon d={Icons.plus} size={14} /></button>
          </div>
          {education.map(edu => (
            <ItemCard key={edu.id} item={edu} fields={{ title: 'degree', sub: 'school' }}
              onEdit={() => { setEditType('edu'); setEditing(edu); }}
              onRemove={() => setEducation(education.filter(e => e.id !== edu.id))}
            />
          ))}
        </div>
      </div>

      <button onClick={save} disabled={saving} style={{ ...S.btnPrimary, marginTop: '20px' }}>
        <Icon d={Icons.save} size={14} /> {saving ? 'Saving...' : 'Save All Changes'}
      </button>
    </div>
  );
}

// ── SKILLS Editor ──────────────────────────────────────────────────────────────
function SkillsEditor({ token, showToast }) {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'networking' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/data?section=skills').then(r => r.json()).then(setSkills);
  }, []);

  const save = async (list) => {
    setSaving(true);
    const res = await fetch('/api/admin/data?section=skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(list || skills),
    });
    const d = await res.json();
    showToast(d.success ? 'Skills saved!' : d.error, d.success ? 'success' : 'error');
    setSaving(false);
  };

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    const updated = [...skills, { id: newSkill.name.toLowerCase().replace(/\s+/g, '-'), ...newSkill }];
    setSkills(updated);
    setNewSkill({ name: '', category: 'networking' });
    save(updated);
  };

  const removeSkill = (id) => {
    const updated = skills.filter(s => s.id !== id);
    setSkills(updated);
    save(updated);
  };

  const catColor = { networking: '#818cf8', web: '#fbbf24', language: '#4ade80' };
  const groups = ['networking', 'web', 'language'];

  return (
    <div>
      <h2 style={S.sectionTitle}>Skills & Tech Stack</h2>
      <p style={S.sectionSub}>Technologies shown in the scrolling marquee</p>

      {groups.map(cat => (
        <div key={cat} style={{ ...S.card, marginBottom: '16px' }}>
          <h3 style={{ color: catColor[cat], fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 14px' }}>
            {cat === 'networking' ? '🌐 Networking' : cat === 'web' ? '💻 Web Dev' : '⚡ Languages'}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.filter(s => s.category === cat).map(s => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 12px 6px 14px', borderRadius: '10px',
                background: `${catColor[cat]}15`, border: `1px solid ${catColor[cat]}40`,
              }}>
                <span style={{ color: catColor[cat], fontWeight: '700', fontSize: '13px' }}>{s.name}</span>
                <button onClick={() => removeSkill(s.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)', padding: '0', lineHeight: 1,
                  display: 'flex', alignItems: 'center',
                }}>
                  <Icon d={Icons.x} size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={S.card}>
        <h3 style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 14px' }}>
          Add New Skill
        </h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={S.label}>Skill Name</label>
            <input style={S.input} placeholder="e.g. BGP" value={newSkill.name}
              onChange={e => setNewSkill(p => ({ ...p, name: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && addSkill()} />
          </div>
          <div>
            <label style={S.label}>Category</label>
            <select style={{ ...S.input, width: 'auto', cursor: 'pointer' }} value={newSkill.category}
              onChange={e => setNewSkill(p => ({ ...p, category: e.target.value }))}>
              <option value="networking">Networking</option>
              <option value="web">Web Dev</option>
              <option value="language">Language</option>
            </select>
          </div>
          <button onClick={addSkill} disabled={saving} style={S.btnPrimary}>
            <Icon d={Icons.plus} size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CERTIFICATES Editor ────────────────────────────────────────────────────────
function CertificatesEditor({ token, showToast }) {
  const [certs, setCerts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    fetch('/api/admin/data?section=certificates').then(r => r.json()).then(setCerts);
  }, []);

  const save = async (list) => {
    setSaving(true);
    const res = await fetch('/api/admin/data?section=certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(list || certs),
    });
    const d = await res.json();
    showToast(d.success ? 'Certificates saved!' : d.error, d.success ? 'success' : 'error');
    setSaving(false);
  };

  const blank = () => ({ id: `cert-${Date.now()}`, title: '', issuer: '', date: '', image: '', verifyUrl: '' });

  const deleteCert = (id) => {
    const updated = certs.filter(c => c.id !== id);
    setCerts(updated);
    save(updated);
    setConfirm(null);
  };

  if (editing) {
    const update = (f, v) => setEditing(p => ({ ...p, [f]: v }));
    const saveEdit = () => {
      const exists = certs.find(c => c.id === editing.id);
      const updated = exists ? certs.map(c => c.id === editing.id ? editing : c) : [...certs, editing];
      setCerts(updated);
      save(updated);
      setEditing(null);
    };
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => setEditing(null)} style={S.btnGhost}>← Back</button>
          <h2 style={{ ...S.sectionTitle, margin: 0 }}>{editing.title || 'New Certificate'}</h2>
        </div>
        <div style={S.card}>
          <div style={S.fieldGroup}><label style={S.label}>Title</label><input style={S.input} value={editing.title} onChange={e => update('title', e.target.value)} /></div>
          <div style={S.fieldGroup}><label style={S.label}>Issuer</label><input style={S.input} value={editing.issuer} onChange={e => update('issuer', e.target.value)} placeholder="e.g. Udemy / Cisco" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={S.fieldGroup}><label style={S.label}>Date / Year</label><input style={S.input} value={editing.date} onChange={e => update('date', e.target.value)} placeholder="2024" /></div>
            <div style={S.fieldGroup}><label style={S.label}>Verify URL</label><input style={S.input} value={editing.verifyUrl} onChange={e => update('verifyUrl', e.target.value)} placeholder="https://" /></div>
          </div>
          <ImageUploadField label="Image Path" value={editing.image} onChange={v => update('image', v)} token={token} showToast={showToast} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={saveEdit} disabled={saving} style={S.btnPrimary}><Icon d={Icons.save} size={14} /> {saving ? 'Saving...' : 'Save Certificate'}</button>
            <button onClick={() => setEditing(null)} style={S.btnGhost}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={S.sectionTitle}>Certificates</h2>
          <p style={S.sectionSub}>Manage credentials and certifications</p>
        </div>
        <button onClick={() => setEditing(blank())} style={S.btnPrimary}><Icon d={Icons.plus} size={14} /> Add Certificate</button>
      </div>

      {confirm && <ConfirmDialog msg={`Delete "${confirm.title}"?`} onConfirm={() => deleteCert(confirm.id)} onCancel={() => setConfirm(null)} />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {certs.map(c => (
          <div key={c.id} style={{ ...S.card, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
              background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
            }}>🏆</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>{c.title}</div>
              <div style={{ color: '#fbbf24', fontSize: '12px', marginTop: '2px' }}>{c.issuer}</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>{c.date}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setEditing(c)} style={S.btnGhost}><Icon d={Icons.edit} size={14} /></button>
              <button onClick={() => setConfirm(c)} style={S.btnDanger}><Icon d={Icons.trash} size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── IMAGE UPLOAD helper component ────────────────────────────────────────────
function ImageUploadField({ value, onChange, token, showToast, label = 'Image Path' }) {
  const [uploading, setUploading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [images, setImages] = useState([]);
  const fileRef = useState(null);
  const inputRef = { current: null };

  const loadImages = async () => {
    try {
      const res = await fetch('/api/admin/upload', { headers: { 'x-admin-token': token } });
      const d = await res.json();
      if (d.images) setImages(d.images);
    } catch {}
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-token': token },
        body: form,
      });
      const d = await res.json();
      if (d.success) {
        onChange(d.path);
        showToast('Image uploaded! ✓', 'success');
      } else {
        showToast(d.error || 'Upload failed', 'error');
      }
    } catch {
      showToast('Upload failed', 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const openPicker = () => {
    loadImages();
    setShowPicker(true);
  };

  return (
    <div style={S.fieldGroup}>
      <label style={S.label}>{label}</label>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginTop: '6px' }}>
        <input style={{ ...S.input, margin: 0, flex: 1 }} value={value} onChange={e => onChange(e.target.value)}
          placeholder="/image/photo.jpg or upload →" />
        <label style={{
          ...S.btnGhost, whiteSpace: 'nowrap', cursor: uploading ? 'not-allowed' : 'pointer',
          opacity: uploading ? 0.5 : 1, padding: '10px 14px',
        }}>
          {uploading ? '⏳' : <><Icon d={Icons.upload} size={14} /> Upload</>}
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} disabled={uploading} />
        </label>
        <button onClick={openPicker} style={{ ...S.btnGhost, padding: '10px 12px', whiteSpace: 'nowrap' }} title="Pick from library">
          <Icon d={Icons.image} size={14} />
        </button>
      </div>
      {/* Preview */}
      {value && (
        <div style={{ marginTop: '10px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', maxHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
          <img src={value} alt="preview" style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} />
        </div>
      )}
      {/* Image picker modal */}
      {showPicker && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9997, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowPicker(false)}>
          <div style={{ background: '#12121e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px', maxWidth: '700px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '18px', fontWeight: '800' }}>📁 Media Library</h3>
              <button onClick={() => setShowPicker(false)} style={{ ...S.btnGhost, padding: '6px 10px' }}>✕</button>
            </div>
            {images.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '40px 0' }}>No images uploaded yet. Upload one first.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                {images.map(img => (
                  <div key={img.filename} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', background: 'rgba(0,0,0,0.3)', aspectRatio: '1' }}
                    onClick={() => { onChange(img.path); setShowPicker(false); showToast('Image selected!', 'success'); }}>
                    <img src={img.path} alt={img.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', fontSize: '9px', color: 'rgba(255,255,255,0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {img.filename}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── MEDIA LIBRARY Section ──────────────────────────────────────────────────────
function MediaLibrary({ token, showToast }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [copied, setCopied] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/upload', { headers: { 'x-admin-token': token } });
      const d = await res.json();
      if (d.images) setImages(d.images);
    } catch {}
  };

  useEffect(() => { load(); }, []);

  const uploadFiles = async (files) => {
    setUploading(true);
    let successCount = 0;
    for (const file of files) {
      try {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/admin/upload', {
          method: 'POST', headers: { 'x-admin-token': token }, body: form,
        });
        const d = await res.json();
        if (d.success) successCount++;
        else showToast(d.error, 'error');
      } catch {}
    }
    if (successCount > 0) {
      showToast(`${successCount} image(s) uploaded!`, 'success');
      load();
    }
    setUploading(false);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    await uploadFiles(files);
    e.target.value = '';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length) await uploadFiles(files);
  };

  const deleteImage = async (img) => {
    try {
      await fetch('/api/admin/upload', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ filename: img.filename }),
      });
      showToast('Image deleted!', 'success');
      load();
    } catch { showToast('Delete failed', 'error'); }
    setConfirm(null);
  };

  const copyPath = (path) => {
    navigator.clipboard.writeText(path);
    setCopied(path);
    setTimeout(() => setCopied(''), 2000);
    showToast('Path copied!', 'success');
  };

  const formatSize = (bytes) => bytes < 1024 ? `${bytes}B` : bytes < 1048576 ? `${(bytes/1024).toFixed(1)}KB` : `${(bytes/1048576).toFixed(1)}MB`;

  return (
    <div>
      <h2 style={S.sectionTitle}>Media Library</h2>
      <p style={S.sectionSub}>Upload and manage images used across the website</p>

      {confirm && <ConfirmDialog msg={`Delete "${confirm.filename}"?`} onConfirm={() => deleteImage(confirm)} onCancel={() => setConfirm(null)} />}

      {/* Upload Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          ...S.card, marginBottom: '24px',
          border: dragOver ? '2px dashed #fbbf24' : '2px dashed rgba(255,255,255,0.1)',
          background: dragOver ? 'rgba(251,191,36,0.05)' : 'rgba(255,255,255,0.02)',
          textAlign: 'center', padding: '40px 24px',
          transition: 'all 0.2s',
        }}
      >
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>{uploading ? '⏳' : '🖼️'}</div>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0 0 16px', fontSize: '14px' }}>
          {uploading ? 'Uploading...' : 'Drag & drop images here, or click to select'}
        </p>
        <label style={{ ...S.btnPrimary, display: 'inline-flex', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.5 : 1 }}>
          <Icon d={Icons.upload} size={16} /> Choose Images
          <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFileChange} disabled={uploading} />
        </label>
        <p style={{ color: 'rgba(255,255,255,0.2)', margin: '12px 0 0', fontSize: '11px' }}>JPG, PNG, WebP, GIF • Max 5MB each</p>
      </div>

      {/* Image Grid */}
      {images.length === 0 ? (
        <div style={{ ...S.card, textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.25)', fontSize: '14px' }}>
          No images uploaded yet
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600' }}>{images.length} image{images.length !== 1 ? 's' : ''}</span>
            <button onClick={load} style={S.btnGhost}>↻ Refresh</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {images.map(img => (
              <div key={img.filename} style={{ ...S.card, padding: '12px', position: 'relative', overflow: 'hidden' }}>
                {/* Image preview */}
                <div style={{ aspectRatio: '16/10', borderRadius: '8px', overflow: 'hidden', background: 'rgba(0,0,0,0.3)', marginBottom: '10px' }}>
                  <img src={img.path} alt={img.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Info */}
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={img.filename}>
                  {img.filename}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginBottom: '10px' }}>{formatSize(img.size)}</div>
                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => copyPath(img.path)} style={{ ...S.btnGhost, flex: 1, justifyContent: 'center', padding: '6px', fontSize: '11px' }}>
                    {copied === img.path ? '✓ Copied!' : <><Icon d={Icons.copy} size={12} /> Copy</>}
                  </button>
                  <button onClick={() => setConfirm(img)} style={{ ...S.btnDanger, padding: '6px 10px' }}>
                    <Icon d={Icons.trash} size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN DASHBOARD ─────────────────────────────────────────────────────────────
const SECTIONS = [
  { key: 'hero',         label: 'Hero',         icon: Icons.home,   component: HeroEditor },
  { key: 'about',        label: 'About',         icon: Icons.user,   component: AboutEditor },
  { key: 'projects',     label: 'Projects',      icon: Icons.folder, component: ProjectsEditor },
  { key: 'experience',   label: 'Experience',    icon: Icons.clock,  component: ExperienceEditor },
  { key: 'skills',       label: 'Skills',        icon: Icons.layers, component: SkillsEditor },
  { key: 'certificates', label: 'Certificates',  icon: Icons.award,  component: CertificatesEditor },
  { key: 'media',        label: 'Media',         icon: Icons.image,  component: MediaLibrary },
];

export default function AdminDashboard() {
  const [active, setActive] = useState('hero');
  const [token, setToken] = useState('');
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = sessionStorage.getItem('admin_token');
    if (!t) { router.push('/nx-panel'); return; }
    setToken(t);
  }, [router]);

  const showToast = useCallback((msg, type) => setToast({ msg, type }), []);

  const logout = () => {
    sessionStorage.removeItem('admin_token');
    router.push('/nx-panel');
  };

  const ActiveComp = SECTIONS.find(s => s.key === active)?.component;

  if (!token) return null;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: '#080810', color: '#fff',
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
    }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarOpen ? '260px' : '72px',
        minWidth: sidebarOpen ? '260px' : '72px',
        background: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s ease, min-width 0.3s ease',
        overflow: 'hidden', position: 'sticky', top: 0, height: '100vh',
      }}>
        {/* Brand */}
        <div style={{
          padding: sidebarOpen ? '28px 24px 20px' : '28px 16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: '12px',
          justifyContent: sidebarOpen ? 'flex-start' : 'center',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(251,191,36,0.05))',
            border: '1px solid rgba(251,191,36,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
          }}>⚡</div>
          {sidebarOpen && (
            <div>
              <div style={{ fontWeight: '800', fontSize: '14px', letterSpacing: '-0.3px' }}>Portfolio CMS</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>Admin Dashboard</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {SECTIONS.map(s => {
            const isActive = active === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  gap: '12px', padding: sidebarOpen ? '11px 14px' : '11px',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '4px',
                  background: isActive ? 'rgba(251,191,36,0.12)' : 'transparent',
                  color: isActive ? '#fbbf24' : 'rgba(255,255,255,0.45)',
                  fontFamily: 'inherit', fontSize: '13px', fontWeight: isActive ? '700' : '500',
                  transition: 'all 0.15s',
                  borderLeft: isActive ? '2px solid #fbbf24' : '2px solid transparent',
                }}
                title={!sidebarOpen ? s.label : undefined}
              >
                <Icon d={s.icon} size={16} />
                {sidebarOpen && <span>{s.label}</span>}
                {sidebarOpen && isActive && (
                  <span style={{
                    marginLeft: 'auto', width: '6px', height: '6px',
                    borderRadius: '50%', background: '#fbbf24',
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => setSidebarOpen(p => !p)}
            style={{ ...S.btnGhost, width: '100%', justifyContent: 'center', marginBottom: '8px', padding: '10px' }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
          <a href="/" target="_blank" style={{
            ...S.btnGhost, width: '100%', justifyContent: sidebarOpen ? 'flex-start' : 'center',
            textDecoration: 'none', marginBottom: '8px', boxSizing: 'border-box',
          }}>
            <Icon d={Icons.eye} size={14} />
            {sidebarOpen && <span>View Site</span>}
          </a>
          <button
            onClick={logout}
            style={{ ...S.btnDanger, width: '100%', justifyContent: sidebarOpen ? 'flex-start' : 'center', boxSizing: 'border-box' }}
          >
            <Icon d={Icons.logout} size={14} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '32px 40px', maxWidth: '900px' }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '32px', paddingBottom: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Admin Dashboard
            </div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff', letterSpacing: '-0.3px' }}>
              {SECTIONS.find(s => s.key === active)?.label} Settings
            </div>
          </div>
          <div style={{
            padding: '8px 16px', borderRadius: '20px',
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
            color: '#4ade80', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
            LIVE
          </div>
        </div>

        {/* Section Content */}
        {ActiveComp && <ActiveComp token={token} showToast={showToast} />}
      </main>

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <style>{`
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #12121e; color: #fff; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
    </div>
  );
}
