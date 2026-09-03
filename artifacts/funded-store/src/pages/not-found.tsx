import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return <main className="mx-auto flex min-h-[70dvh] max-w-2xl flex-col items-center justify-center px-5 text-center">
    <div className="grid size-16 place-items-center rounded-[20px] bg-secondary text-primary"><Compass className="size-7" /></div>
    <p className="mt-7 font-data text-[10px] uppercase tracking-[.2em] text-muted-foreground">404 / wrong turn</p>
    <h1 className="mt-4 font-display text-6xl leading-none sm:text-8xl">Not on the map.</h1>
    <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">This page wandered off. The good stuff is waiting back at the collection.</p>
    <Link href="/" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-x-1" data-testid="link-not-found-home"><ArrowLeft className="size-4" /> Return to funded</Link>
  </main>;
}
