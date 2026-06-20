export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: '0.5rem',
          textAlign: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <h1>Hmm, nothing found</h1>
        <p>The page you are looking for does not exist.</p>
      </body>
    </html>
  );
}
