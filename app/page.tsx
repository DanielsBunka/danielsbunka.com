export default function Home() {
  return (
    <main style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Daniels' AI Portfolio</h1>
      <p>Welcome to my site. I'm a CS student at LJMU.</p>
      
      <div style={{ marginTop: '20px', border: '1px solid #000000', padding: '20px' }}>
        <h3>Chat with my Recruiter Bot</h3>
        <input type="text" placeholder="Ask me something..." style={{ padding: '10px', width: '300px' }} />
        <button style={{ padding: '10px 20px', marginLeft: '10px' }}>Send</button>
      </div>
    </main>
  );
}