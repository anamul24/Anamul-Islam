export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#080810', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
