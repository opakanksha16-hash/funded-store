import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleCheck, Info, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useParams } from 'wouter';
import { getGetProductQueryKey, useGetProduct } from '@workspace/api-client-react';
import type { EmiPlan, Variant } from '@workspace/api-client-react';

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

function DetailSkeleton() {
  return <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:px-10"><div className="h-5 w-32 animate-pulse rounded bg-secondary" /><div className="mt-10 grid gap-12 md:grid-cols-2"><div className="aspect-square animate-pulse rounded-[32px] bg-secondary" /><div className="space-y-5"><div className="h-3 w-20 animate-pulse rounded bg-secondary" /><div className="h-14 w-3/4 animate-pulse rounded bg-secondary" /><div className="h-5 w-full animate-pulse rounded bg-secondary" /><div className="mt-10 h-40 animate-pulse rounded-[24px] bg-secondary" /></div></div></main>;
}

function PlanCard({ plan, selected, onSelect }: { plan: EmiPlan; selected: boolean; onSelect: () => void }) {
  return <button onClick={onSelect} className={`plan-card focus-ring relative w-full rounded-[20px] border p-5 text-left ${selected ? 'border-primary bg-primary text-primary-foreground shadow-soft' : 'border-border/80 bg-card hover:border-primary/40'}`} data-testid={`button-plan-${plan.id}`}>
    {plan.isPopular && <span className={`absolute -top-3 left-4 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[.12em] ${selected ? 'bg-accent text-accent-foreground' : 'bg-accent text-accent-foreground'}`}>most chosen</span>}
    <div className="flex items-start justify-between gap-3"><div><p className={`font-data text-[10px] uppercase tracking-[.14em] ${selected ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{plan.tenureMonths} months</p><p className="mt-2 text-2xl font-bold tracking-[-.05em]">{money(plan.monthlyPayment)}<span className={`ml-1 text-xs font-medium tracking-normal ${selected ? 'text-primary-foreground/65' : 'text-muted-foreground'}`}>/ month</span></p></div><span className={`mt-1 grid size-5 place-items-center rounded-full border ${selected ? 'border-primary-foreground bg-primary-foreground text-primary' : 'border-border text-transparent'}`}><Check className="size-3.5" /></span></div>
    <div className={`mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t pt-4 text-[11px] ${selected ? 'border-primary-foreground/20 text-primary-foreground/70' : 'border-border/70 text-muted-foreground'}`}><span>{plan.interestRate}% interest</span><span>{money(plan.cashback)} cashback</span><span>Total {money(plan.totalPayable)}</span></div>
  </button>;
}

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';
  const [, setLocation] = useLocation();
  const productQuery = useGetProduct(slug, { query: { enabled: !!slug, queryKey: getGetProductQueryKey(slug) } });
  const product = productQuery.data;
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(product.variants[0]?.id ?? null);
      setSelectedPlanId(product.plans.find((plan) => plan.isPopular)?.id ?? product.plans[0]?.id ?? null);
    }
  }, [product]);

  const selectedVariant = useMemo(() => product?.variants.find((variant) => variant.id === selectedVariantId), [product, selectedVariantId]);
  const selectedPlan = useMemo(() => product?.plans.find((plan) => plan.id === selectedPlanId), [product, selectedPlanId]);
  const displayPrice = (product?.price ?? 0) + (selectedVariant?.priceAdjustment ?? 0);
  const comparePlans = product?.plans.slice(0, 2) ?? [];

  if (productQuery.isLoading) return <DetailSkeleton />;
  if (productQuery.isError) return <main className="mx-auto max-w-2xl px-5 py-24 text-center"><p className="font-display text-5xl">A small detour.</p><p className="mt-3 text-muted-foreground">We couldn't find that product right now.</p><button onClick={() => productQuery.refetch()} className="mt-7 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" data-testid="button-retry-product">Try again</button></main>;
  if (!product) return <main className="mx-auto max-w-2xl px-5 py-24 text-center"><p className="font-display text-5xl">Not on this shelf.</p><p className="mt-3 text-muted-foreground">That product may have moved on. Let's find you another good fit.</p><Link href="/" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" data-testid="link-back-to-catalog">Back to the collection</Link></main>;

  return <main className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8 lg:px-10">
    <Link href="/" className="focus-ring inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" data-testid="link-back-products"><ArrowLeft className="size-4" /> All phones</Link>
    <div className="mt-8 grid gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-16 lg:mt-12">
      <div className="reveal">
        <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-secondary/60 p-8 sm:p-12">
          <div className="absolute left-6 top-6 rounded-full bg-card/80 px-3 py-1.5 font-data text-[9px] uppercase tracking-[.15em] text-primary backdrop-blur-sm">{product.badge || 'Funded pick'}</div>
          <img src={selectedVariant?.imageUrl || product.imageUrl} alt={`${product.brand} ${product.name}`} className="aspect-square w-full object-contain mix-blend-multiply transition-opacity duration-300" data-testid="img-product-detail" />
          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-semibold text-muted-foreground"><LockKeyhole className="size-3.5" /> Secure, transparent checkout</div>
        </div>
        {product.variants.length > 0 && <div className="mt-5 flex items-center gap-3 overflow-x-auto pb-1">{product.variants.map((variant: Variant) => <button key={variant.id} onClick={() => setSelectedVariantId(variant.id)} className={`focus-ring flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${selectedVariantId === variant.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border/80 bg-card hover:border-primary/50'}`} data-testid={`button-variant-${variant.id}`}><span className="size-3 rounded-full border border-foreground/20" style={{ backgroundColor: variant.color }} />{variant.name}: {variant.value}</button>)}</div>}
      </div>
      <div className="reveal reveal-delay-1">
        <p className="font-data text-[10px] uppercase tracking-[.2em] text-muted-foreground">{product.brand}</p>
        <h1 className="mt-3 max-w-xl text-5xl font-bold leading-[.9] tracking-[-.07em] sm:text-7xl">{product.name}</h1>
        <p className="mt-5 max-w-xl font-display text-2xl italic leading-tight text-primary sm:text-3xl">{product.tagline}</p>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{product.description}</p>
        <div className="mt-8 flex items-end gap-4"><div><p className="text-xs text-muted-foreground">device price</p><p className="mt-1 text-3xl font-bold tracking-[-.06em]" data-testid="text-detail-price">{money(displayPrice)}</p></div><p className="pb-1 text-sm text-muted-foreground line-through">{money(product.mrp)}</p><span className="mb-1 rounded-full bg-accent/35 px-2.5 py-1 text-[10px] font-bold text-primary">save {money(Math.max(product.mrp - displayPrice, 0))}</span></div>

        <div className="mt-12 border-t border-border/70 pt-7">
          <div className="flex items-end justify-between gap-4"><div><p className="font-data text-[10px] uppercase tracking-[.17em] text-muted-foreground">03 / choose your pace</p><h2 className="mt-2 font-display text-3xl">Your monthly number.</h2></div><button onClick={() => setCompareOpen(!compareOpen)} className="focus-ring flex items-center gap-1.5 text-xs font-bold text-primary" data-testid="button-toggle-compare">Compare plans <ChevronDown className={`size-4 transition-transform ${compareOpen ? 'rotate-180' : ''}`} /></button></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{product.plans.map((plan) => <PlanCard key={plan.id} plan={plan} selected={selectedPlanId === plan.id} onSelect={() => { setSelectedPlanId(plan.id); setConfirmed(false); }} />)}</div>
          {compareOpen && comparePlans.length > 0 && <div className="mt-5 overflow-hidden rounded-[20px] border border-border/70 bg-card text-xs"><div className="grid grid-cols-3 border-b border-border/70 bg-secondary/50 px-4 py-3 font-data text-[9px] uppercase tracking-[.12em] text-muted-foreground"><span>compare</span><span>{comparePlans[0].tenureMonths} mo</span><span>{comparePlans[1]?.tenureMonths ?? '—'} mo</span></div>{[['monthly', ...comparePlans.map((plan) => money(plan.monthlyPayment))], ['interest', ...comparePlans.map((plan) => `${plan.interestRate}%`)], ['total', ...comparePlans.map((plan) => money(plan.totalPayable))]].map((row) => <div key={row[0]} className="grid grid-cols-3 border-b border-border/50 px-4 py-3 last:border-0"><span className="text-muted-foreground">{row[0]}</span><span className="font-semibold">{row[1]}</span><span className="font-semibold">{row[2]}</span></div>)}</div>}
          {selectedPlan && <div className="mt-6 rounded-[20px] bg-secondary/70 p-4"><div className="flex gap-3"><Info className="mt-0.5 size-4 shrink-0 text-primary" /><p className="text-xs leading-5 text-muted-foreground">You’ll pay <strong className="text-foreground">{money(selectedPlan.monthlyPayment)} monthly</strong> for {selectedPlan.tenureMonths} months. Cashback of {money(selectedPlan.cashback)} is already shown here.</p></div></div>}
          <button onClick={() => setConfirmed(true)} disabled={!selectedPlan} className="button-shine focus-ring mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition-transform hover:translate-y-[-2px] disabled:cursor-not-allowed disabled:opacity-50" data-testid="button-continue-plan">Continue with this plan <ArrowRight className="size-4" /></button>
          {confirmed && selectedPlan && <div className="reveal mt-4 rounded-[20px] border border-primary/20 bg-card p-5" data-testid="status-plan-selected"><div className="flex gap-3"><CircleCheck className="size-5 shrink-0 text-primary" /><div><p className="font-semibold">Plan saved for your journey.</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Your {planLabel(selectedPlan)} plan for the {product.name} is ready to continue. No payment has been taken.</p><button onClick={() => setLocation('/')} className="mt-3 text-xs font-bold text-primary underline underline-offset-4" data-testid="button-back-to-shop">Keep browsing</button></div></div></div>}
        </div>
      </div>
    </div>
    <div className="mt-16 grid gap-4 border-t border-border/70 pt-8 text-xs text-muted-foreground sm:grid-cols-3"><div className="flex gap-3"><ShieldCheck className="size-5 shrink-0 text-primary" /><span><strong className="block text-foreground">Mutual-fund backed</strong><span className="mt-1 block">A more considered way to make room for a big buy.</span></span></div><div className="flex gap-3"><CircleCheck className="size-5 shrink-0 text-primary" /><span><strong className="block text-foreground">All numbers upfront</strong><span className="mt-1 block">Monthly, interest, cashback, total. No surprises.</span></span></div><div className="flex gap-3"><LockKeyhole className="size-5 shrink-0 text-primary" /><span><strong className="block text-foreground">A calm checkout</strong><span className="mt-1 block">Review your choice before anything moves forward.</span></span></div></div>
  </main>;
}

function planLabel(plan: EmiPlan) {
  return `${plan.tenureMonths}-month`;
}