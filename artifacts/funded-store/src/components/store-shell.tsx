import type { ReactNode } from 'react';
import { ArrowUpRight, Check, CircleHelp, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { useHealthCheck } from '@workspace/api-client-react';

export function StoreShell({ children }: { children: ReactNode }) {
  const health = useHealthCheck();
  const isHealthy = health.data?.status === 'ok' || health.data?.status === 'healthy';

  return (
    <div className="store-shell grain min-h-[100dvh]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="focus-ring group flex items-center gap-3" data-testid="link-home">
          <span className="grid size-10 place-items-center rounded-[13px] bg-primary text-primary-foreground shadow-soft transition-transform group-hover:rotate-[-6deg]">
            <span className="text-lg font-bold tracking-[-.08em]">F.</span>
          </span>
          <span className="leading-none">
            <span className="block text-[15px] font-bold tracking-[-.04em]">funded</span>
            <span className="mt-1 block font-data text-[8px] uppercase tracking-[.18em] text-muted-foreground">store / clear by design</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex" aria-label="Primary navigation">
          <a href="#how-it-works" className="focus-ring transition-colors hover:text-foreground" data-testid="link-how-it-works">How it works</a>
          <a href="#promise" className="focus-ring transition-colors hover:text-foreground" data-testid="link-our-promise">Our promise</a>
          <span className="flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-2 font-data text-[10px] uppercase tracking-[.12em] text-muted-foreground">
            <span className={`size-1.5 rounded-full ${health.isLoading ? 'animate-pulse bg-accent' : isHealthy ? 'bg-primary' : 'bg-muted-foreground'}`} />
            {health.isLoading ? 'checking' : isHealthy ? 'plans live' : 'plans ready'}
          </span>
        </nav>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CircleHelp className="size-4" />
          <span className="hidden sm:inline">Need a hand?</span>
          <span className="font-semibold text-foreground">Talk to us</span>
        </div>
      </header>
      {children}
      <footer className="mx-auto mt-20 max-w-7xl border-t border-border/70 px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2024 funded store. Make room for what matters.</p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-primary" /> Transparent pricing</span>
            <span className="flex items-center gap-1.5"><Check className="size-3.5 text-primary" /> No hidden fees</span>
            <ArrowUpRight className="size-4" />
          </div>
        </div>
      </footer>
    </div>
  );
}