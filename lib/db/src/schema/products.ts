import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  brand: text("brand").notNull(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  mrp: integer("mrp").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
  badge: text("badge"),
});

export const productVariantsTable = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  value: text("value").notNull(),
  color: text("color").notNull(),
  priceAdjustment: integer("price_adjustment").notNull().default(0),
  imageUrl: text("image_url").notNull(),
});

export const emiPlansTable = pgTable("emi_plans", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id, { onDelete: "cascade" }),
  tenureMonths: integer("tenure_months").notNull(),
  monthlyPayment: integer("monthly_payment").notNull(),
  interestRate: numeric("interest_rate", { precision: 5, scale: 2 }).notNull(),
  cashback: integer("cashback").notNull().default(0),
  isPopular: boolean("is_popular").notNull().default(false),
  totalPayable: integer("total_payable").notNull(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({
  id: true,
});
export const insertProductVariantSchema = createInsertSchema(
  productVariantsTable,
).omit({ id: true });
export const insertEmiPlanSchema = createInsertSchema(emiPlansTable).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
export type ProductVariant = typeof productVariantsTable.$inferSelect;
export type EmiPlan = typeof emiPlansTable.$inferSelect;