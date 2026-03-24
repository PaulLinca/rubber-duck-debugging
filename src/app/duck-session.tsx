'use client'

import { useState } from 'react'

const DUCK_RESPONSES = [
  "Quack.",
  "...quack?",
    "Quack?",
    "Quack quack...",
    "Quack..."
  // "Have you tried turning it off and on again? Quack.",
  // "Interesting. Have you considered that the bug is you? Quack.",
  // "I have listened carefully. It is definitely a skill issue. Quack.",
  // "Did you check if it's plugged in? Quack.",
  // "I see the problem. It's on line 42. Just kidding, I'm a duck. Quack.",
  // "Stack Overflow has the answer. I do not. Quack.",
  // "Wait — did you save the file? Quack.",
  // "Have you tried rubber duck debugging? ...Oh. Right. Quack.",
  // "The error message is trying to tell you something. Have you read it? Quack.",
  // "Fascinating. Absolutely fascinating. I have no idea what any of that means. Quack.",
  // "git blame will tell you who wrote this. It was you, wasn't it. Quack.",
  // "I sense a missing semicolon. Or a missing coffee. Hard to say. Quack.",
  // "The cloud is just someone else's computer. Your bug is just someone else's feature. Quack.",
  // "console.log everything. God will sort it out. Quack.",
  // "It works on my pond. Quack.",
  // "Have you tried rewriting it in Rust? No, neither have I. Quack.",
  // "That's a very interesting off-by-one error you have there. Quack.",
  // "Did you commit your changes? Did you push? Did you even branch? Quack.",
]

type Phase = 'idle' | 'listening' | 'thinking' | 'responded'

export default function DuckSession() {
  const [problem, setProblem] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const [response, setResponse] = useState('')
  const [responseIndex, setResponseIndex] = useState(0)
  const [solved, setSolved] = useState<boolean | null>(null)

  function handleTalkToDuck() {
    if (!problem.trim()) return
    setPhase('listening')
    setSolved(null)

    setTimeout(() => {
      setPhase('thinking')
      setTimeout(() => {
        const idx = responseIndex % DUCK_RESPONSES.length
        setResponse(DUCK_RESPONSES[idx])
        setResponseIndex(idx + 1)
        setPhase('responded')
      }, 1200)
    }, 800)
  }

  function handleReset() {
    setProblem('')
    setPhase('idle')
    setResponse('')
    setSolved(null)
  }

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Speech bubble */}
      {phase === 'responded' && response && (
        <div className="bg-zinc-50 rounded-2xl px-5 py-4">
          <p className="text-zinc-700 text-base text-center italic leading-relaxed">
            &ldquo;{response}&rdquo;
          </p>
        </div>
      )}

      {/* Thinking state */}
      {(phase === 'listening' || phase === 'thinking') && (
        <div className="bg-zinc-50 rounded-2xl px-5 py-4 text-center text-zinc-400 text-sm">
          {phase === 'listening' ? 'Listening...' : 'Thinking...'}
        </div>
      )}

      {/* Input area */}
      {phase === 'idle' && (
        <div className="flex flex-col gap-3">
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleTalkToDuck()
            }}
            placeholder="My code doesn't work and I don't know why. It worked yesterday. Nothing changed. I hate everything..."
            rows={3}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 resize-none transition-colors"
          />
          <button
            onClick={handleTalkToDuck}
            disabled={!problem.trim()}
            className="self-start rounded-lg bg-zinc-900 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 transition-colors"
          >
            Talk to the Duck
          </button>
        </div>
      )}

      {/* Post-response — did it help? */}
      {phase === 'responded' && solved === null && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-zinc-400 text-center">Did that help?</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setSolved(true)}
              className="rounded-lg bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Yes, I fixed it
            </button>
            <button
              onClick={() => { setSolved(null); setPhase('idle') }}
              className="rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Solved */}
      {solved === true && (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-zinc-900 font-semibold">You solved it. The duck is not surprised.</p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            As always, the answer revealed itself the moment you started explaining.
          </p>
          <button
            onClick={handleReset}
            className="text-sm text-zinc-400 hover:text-zinc-700 underline underline-offset-4 transition-colors"
          >
            Debug another problem
          </button>
        </div>
      )}

    </div>
  )
}
