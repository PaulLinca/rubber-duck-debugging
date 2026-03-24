'use client'

import {useState} from 'react'

const RESPONSES = [
    "Quack.",
    "...quack?",
    "Quack?",
    "Quack quack...",
    "Quack...",
]

type Phase = 'idle' | 'listening' | 'thinking' | 'responded'

export default function DuckSession() {
    const [problem, setProblem] = useState('')
    const [phase, setPhase] = useState<Phase>('idle')
    const [response, setResponse] = useState('')
    const [responseIndex, setResponseIndex] = useState(0)
    const [solved, setSolved] = useState(false)

    function handleSubmit() {
        if (!problem.trim()) return
        setPhase('listening')

        setTimeout(() => {
            setPhase('thinking')
            setTimeout(() => {
                setResponse(RESPONSES[responseIndex % RESPONSES.length])
                setResponseIndex(i => i + 1)
                setPhase('responded')
            }, 1200)
        }, 800)
    }

    function handleReset() {
        setProblem('')
        setPhase('idle')
        setResponse('')
        setSolved(false)
    }

    return (
        <div className="w-full flex flex-col gap-4">

            {(phase === 'listening' || phase === 'thinking') && (
                <div className="bg-zinc-50 rounded-2xl px-5 py-4 text-center text-zinc-400 text-sm">
                    {phase === 'listening' ? 'Listening...' : 'Thinking...'}
                </div>
            )}

            {phase === 'responded' && (
                <div className="bg-zinc-50 rounded-2xl px-5 py-4">
                    <p className="text-zinc-700 text-base text-center italic leading-relaxed">
                        &ldquo;{response}&rdquo;
                    </p>
                </div>
            )}

            {phase === 'idle' && (
                <div className="flex flex-col gap-3">
          <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
              }}
              placeholder="My code doesn't work and I don't know why. It worked yesterday. Nothing changed. I hate everything..."
              rows={3}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-400 resize-none transition-colors"
          />
                    <button
                        onClick={handleSubmit}
                        disabled={!problem.trim()}
                        className="self-start rounded-lg bg-zinc-900 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 transition-colors"
                    >
                        Talk to the Duck
                    </button>
                </div>
            )}

            {phase === 'responded' && !solved && (
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
                            onClick={() => {
                                setPhase('idle')
                            }}
                            className="rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-sm font-medium px-5 py-2.5 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )}

            {solved && (
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
