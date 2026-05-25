import './globals.css'

export const metadata = {
  title: 'AI Text Summarizer',
  description: 'Extract key insights from any article or document in seconds',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="container">
          <header>
            <h1>AI Text Summarizer</h1>
            <p className="subtitle">Extract key insights from any article or document in seconds</p>
          </header>
          <main>{children}</main>
          <footer>Powered by MiMo AI &mdash; 100T Token Grant Program</footer>
        </div>
      </body>
    </html>
  )
}