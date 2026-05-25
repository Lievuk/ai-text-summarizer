"use client"
import { useState } from "react"

function analyzeText(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordFreq = {};
  words.forEach(w => {
    w = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (w.length > 3) wordFreq[w] = (wordFreq[w] || 0) + 1;
  });
  const sorted = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]);
  const topWords = sorted.slice(0, 10).map(([w]) => w);
  const scored = sentences.map((s, i) => ({
    idx: i,
    text: s.trim(),
    score: topWords.filter(w => s.toLowerCase().includes(w)).length
  }));
  scored.sort((a, b) => b.score - a.score);
  const summary = scored.slice(0, Math.max(3, Math.ceil(sentences.length * 0.3)))
    .sort((a, b) => a.idx - b.idx)
    .map(s => s.text).join(' ');
  return {
    original: text,
    summary,
    originalLen: text.length,
    summaryLen: summary.length,
    compression: Math.round((1 - summary.length / text.length) * 100)
  };
}

export default function Home() {
  const [text, setText] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = () => {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      try {
        const res = analyzeText(text)
        setResult(res)
      } catch(e) {
        setResult({ summary: "Error: " + e.message })
      }
      setLoading(false)
    }, 500)
  }

  return (
    <>
      <div className="card">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to summarize..."
        />
        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <button className="btn" onClick={handleAnalyze} disabled={loading || !text.trim()}>
            {loading ? "Analyzing..." : "Summarize"}
          </button>
        </div>
      </div>

      {result && (
        <div className="card">
          <h2 style={{ marginBottom: "1rem", color: "#667eea" }}>Summary</h2>
          <div className="result">{result.summary}</div>
          <p style={{ color: "#888", marginTop: "1rem", fontSize: "0.85rem" }}>
            Original: {result.originalLen} chars &rarr; Summary: {result.summaryLen} chars
            (compression: {result.compression}%)
          </p>
        </div>
      )}
    </>
  )
}