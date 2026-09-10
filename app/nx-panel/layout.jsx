export default function AdminLayout({ children }) {
  return (
    <div style={{ margin: 0, minHeight: '100vh', background: '#080810', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {children}
    </div>
  );
}
