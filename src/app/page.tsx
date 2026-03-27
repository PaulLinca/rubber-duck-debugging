import Image from 'next/image'
import DuckSession from './duck-session'

export default function Home() {
    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            <main className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
                <div className="flex flex-col items-center gap-3">
                    <Image
                        src="/rubber_duck_larger.webp"
                        alt="Rubber duck"
                        width={200}
                        height={200}
                        priority
                        className="w-[250px] h-auto drop-shadow-md"
                    />
                    <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
                        Talk to the duck.
                    </h1>
                    <p className="text-zinc-400 text-sm max-w-sm text-center leading-relaxed">
                        Explain your bug out loud. You&apos;ll solve it yourself.
                        The duck just listens.
                    </p>
                </div>

                <div className="w-full max-w-lg">
                    <DuckSession/>
                </div>
            </main>

            <footer className="px-6 py-4 text-center text-xs text-zinc-300 flex flex-col gap-1 items-center">
                <span>The duck takes no credit. The duck takes no blame.</span>
                <a
                    href="https://buymeacoffee.com/vybesappsv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-zinc-500 transition-colors"
                >
                    Buy the duck a coffee.
                </a>
            </footer>
        </div>
    )
}
