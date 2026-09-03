import { ArrowUpRight, BadgeCheck, CalendarDays } from 'lucide-react';
import type { ProductSummary } from '@workspace/api-client-react';
import { Link } from 'wouter';

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export function ProductCard({ product, index }: { product: ProductSummary; index: number }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`product-card focus-ring group relative flex flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card shadow-soft reveal reveal-delay-${Math.min(index + 1, 3)}`}
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-[1.08] overflow-hidden bg-secondary/50">
        <div className="absolute left-5 top-5 z-10 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-primary backdrop-blur-sm">
          <BadgeCheck className="size-3.5" /> {product.badge || 'Funded pick'}
        </div>
        <img
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          className="size-full object-contain p-8 mix-blend-multiply"
          data-testid={`img-product-${product.id}`}
          onError={(event) => { event.currentTarget.classList.add('hidden'); event.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
        />
        <div className="image-fallback absolute inset-0 hidden place-items-center p-10 text-center font-display text-4xl text-primary/50">{product.brand}</div>
        <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full border border-border/70 bg-card/80 text-primary opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-data text-[10px] uppercase tracking-[.16em] text-muted-foreground">{product.brand}</p>
        <h2 className="mt-2 text-xl font-bold tracking-[-.04em]">{product.name}</h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">{product.tagline}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border/70 pt-5">
          <div>
            <p className="text-[11px] text-muted-foreground">from</p>
            <p className="mt-0.5 text-xl font-bold tracking-[-.04em]" data-testid={`text-price-${product.id}`}>{money(product.startingPrice)}</p>
            <p className="text-xs text-muted-foreground line-through">{money(product.mrp)}</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-[11px] font-semibold text-primary">
            <CalendarDays className="size-3.5" /> easy EMI
          </span>
        </div>
      </div>
    </Link>
  );
}