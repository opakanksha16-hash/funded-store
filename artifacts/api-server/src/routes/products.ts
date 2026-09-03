import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, emiPlansTable, productVariantsTable, productsTable } from "@workspace/db";
import {
  GetProductParams,
  GetProductResponse,
  ListProductsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/products", async (_req, res): Promise<void> => {
  const products = await db
    .select({
      id: productsTable.id,
      slug: productsTable.slug,
      brand: productsTable.brand,
      name: productsTable.name,
      tagline: productsTable.tagline,
      startingPrice: productsTable.price,
      mrp: productsTable.mrp,
      imageUrl: productsTable.imageUrl,
      badge: productsTable.badge,
    })
    .from(productsTable)
    .orderBy(asc(productsTable.id));

  res.json(ListProductsResponse.parse(products));
});

router.get("/products/:slug", async (req, res): Promise<void> => {
  const parsedParams = GetProductParams.safeParse(req.params);
  if (!parsedParams.success) {
    res.status(400).json({ error: parsedParams.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.slug, parsedParams.data.slug));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const [variants, plans] = await Promise.all([
    db
      .select({
        id: productVariantsTable.id,
        name: productVariantsTable.name,
        value: productVariantsTable.value,
        color: productVariantsTable.color,
        priceAdjustment: productVariantsTable.priceAdjustment,
        imageUrl: productVariantsTable.imageUrl,
      })
      .from(productVariantsTable)
      .where(eq(productVariantsTable.productId, product.id))
      .orderBy(asc(productVariantsTable.id)),
    db
      .select({
        id: emiPlansTable.id,
        tenureMonths: emiPlansTable.tenureMonths,
        monthlyPayment: emiPlansTable.monthlyPayment,
        interestRate: emiPlansTable.interestRate,
        cashback: emiPlansTable.cashback,
        isPopular: emiPlansTable.isPopular,
        totalPayable: emiPlansTable.totalPayable,
      })
      .from(emiPlansTable)
      .where(eq(emiPlansTable.productId, product.id))
      .orderBy(asc(emiPlansTable.tenureMonths)),
  ]);

  const response = {
    ...product,
    variants,
    plans: plans.map((plan) => ({
      ...plan,
      interestRate: Number(plan.interestRate),
    })),
  };

  res.json(GetProductResponse.parse(response));
});

export default router;