import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, Check, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { useListProducts } from '@workspace/api-client-react';
import { ProductCard } from '@/components/product-card';

function CatalogSkeleton() {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="overflow-hidden rounded-[24px] border border-border/60 bg-card"><div className="aspect-[1.08] animate-pulse bg-secondary" /><div className="space-y-3 p-6"><div className="h-3 w-20 animate-pulse rounded bg-secondary" /><div className="h-6 w-40 animate-pulse rounded bg-secondary" /><div className="h-4 w-full animate-pulse rounded bg-secondary" /></div></div>)}</div>;
}

function CatalogError({ retry }: { retry: () => void }) {
  return <div className="rounded-[24px] border border-destructive/30 bg-card p-10 text-center"><p className="font-display text-3xl">The shelf is taking a moment.</p><p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">We couldn't load today's devices. Your plans are safe; please try once more.</p><button onClick={retry} className="button-shine focus-ring mt-6 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" data-testid="button-retry-products">Try again</button></div>;
}

export default function Home() {
  const productsQuery = useListProducts();
  const products = productsQuery.data ?? [];
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('All');
  const brands = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.brand)))], [products]);
  const filtered = useMemo(() => products.filter((product) => {
    const matchesSearch = `${product.brand} ${product.name} ${product.tagline}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (brand === 'All' || product.brand === brand);
  }), [products, search, brand]);

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-10 sm:px-8 md:grid-cols-[1.03fr_.97fr] md:items-center md:pb-24 md:pt-16 lg:px-10">
        <div className="reveal">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-primary">
            <Sparkles className="size-3.5 text-accent" /> purchase with a plan
          </div>
          <h1 className="max-w-2xl text-balance text-[clamp(3.6rem,8vw,7.7rem)] leading-[.88] tracking-[-.075em]">
            <span className="font-display italic text-primary">Good tech.</span><br />
            <span className="font-bold">Clear terms.</span>
          </h1>
          <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Your next phone, without the fog. Compare real devices with mutual-fund-backed EMI plans that make the monthly number feel honest.
          </p>
          <a href="#catalog" className="focus-ring mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:translate-x-1" data-testid="link-browse-catalog">
            Browse the collection <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="relative reveal reveal-delay-2">
          <div className="absolute -right-2 top-8 size-36 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[36px] border border-primary/10 bg-primary p-7 text-primary-foreground shadow-lift sm:p-10">
            <div className="flex items-start justify-between">
              <div><p className="font-data text-[10px] uppercase tracking-[.2em] text-primary-foreground/60">the funded brief</p><p className="mt-3 max-w-xs font-display text-4xl leading-none sm:text-5xl">A better way to buy big.</p></div>
              <ArrowDownRight className="size-6 text-accent" />
            </div>
            <div className="mt-16 border-t border-primary-foreground/20 pt-5">
              <div className="flex items-center justify-between text-sm"><span className="text-primary-foreground/65">What you see</span><span className="font-semibold">What you pay</span></div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-primary-foreground/10 p-3"><p className="font-data text-[9px] uppercase text-primary-foreground/50">price</p><p className="mt-2 text-sm font-bold">Upfront</p></div>
                <div className="rounded-2xl bg-accent p-3 text-accent-foreground"><p className="font-data text-[9px] uppercase opacity-60">plan</p><p className="mt-2 text-sm font-bold">Plainspoken</p></div>
                <div className="rounded-2xl bg-primary-foreground/10 p-3"><p className="font-data text-[9px] uppercase text-primary-foreground/50">backing</p><p className="mt-2 text-sm font-bold">Mutual fund</p></div>
              </div>
            </div>
            <span className="absolute -bottom-4 -right-3 grid size-24 place-items-center rounded-full border-8 border-background bg-accent text-center text-[10px] font-bold uppercase leading-3 tracking-[.1em] text-accent-foreground rotate-12">made<br />to make<br />sense</span>
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl scroll-mt-8 px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 border-t border-border/70 py-9 md:flex-row md:items-end">
          <div><p className="font-data text-[10px] uppercase tracking-[.18em] text-muted-foreground">01 / choose well</p><h2 className="line-accent mt-3 font-display text-4xl sm:text-5xl">The current edit.</h2></div>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">A considered set of phones, each one ready for a plan that respects your pace.</p>
        </div>
        <div className="mb-8 flex flex-col gap-4 rounded-[20px] border border-border/70 bg-card/65 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <label className="flex flex-1 items-center gap-3 px-2 text-sm text-muted-foreground">
            <Search className="size-4 shrink-0" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by device or brand" className="focus-ring w-full bg-transparent py-2 text-foreground outline-none placeholder:text-muted-foreground" data-testid="input-search-products" />
          </label>
          <div className="flex items-center gap-1 overflow-x-auto border-t border-border/70 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
            {brands.map((item) => <button key={item} onClick={() => setBrand(item)} className={`focus-ring whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors ${brand === item ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`} data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}
          </div>
        </div>
        {productsQuery.isLoading ? <CatalogSkeleton /> : productsQuery.isError ? <CatalogError retry={() => productsQuery.refetch()} /> : products.length === 0 ? <div className="rounded-[24px] border border-dashed border-border p-16 text-center"><p className="font-display text-3xl">A quiet shelf, for now.</p><p className="mt-2 text-sm text-muted-foreground">New devices are on their way.</p></div> : filtered.length === 0 ? <div className="rounded-[24px] border border-dashed border-border p-12 text-center"><p className="font-display text-3xl">No close matches.</p><button onClick={() => { setSearch(''); setBrand('All'); }} className="mt-4 text-sm font-semibold text-primary underline underline-offset-4" data-testid="button-clear-filters">Clear filters</button></div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>}
      </section>

      <section id="how-it-works" className="mx-auto mt-24 max-w-7xl scroll-mt-8 border-y border-border/70 px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[.75fr_1.25fr]">
          <div><p className="font-data text-[10px] uppercase tracking-[.18em] text-muted-foreground">02 / no guesswork</p><h2 className="mt-4 max-w-sm font-display text-4xl leading-[.95] sm:text-5xl">Finance that speaks human.</h2></div>
          <div className="grid gap-7 sm:grid-cols-3">
            {[['01', 'Choose your phone', 'Look at the real price, the real finish, and nothing dressed up.'], ['02', 'Pick your pace', 'See the monthly payment, interest, cashback, and total side by side.'], ['03', 'Make it yours', 'Continue with the plan that fits. Your investment stays invested.']].map(([number, title, text]) => <div key={number} className="border-l-2 border-accent pl-5"><p className="font-data text-xs text-accent">{number}</p><h3 className="mt-5 text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}
          </div>
        </div>
      </section>
      <section id="promise" className="mx-auto grid max-w-7xl scroll-mt-8 gap-8 px-5 py-16 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
        <div><div className="flex items-center gap-2 text-sm font-semibold text-primary"><ShieldCheck className="size-5" /> The funded promise</div><p className="mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">If a number matters to your decision, it belongs on the page.</p></div>
        <div className="flex gap-5 text-xs text-muted-foreground"><span className="flex items-center gap-2"><Check className="size-4 text-accent" /> No hidden fees</span><span className="flex items-center gap-2"><Check className="size-4 text-accent" /> No confusing fine print</span></div>
      </section>
    </main>
  );
}