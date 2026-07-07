import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

async function seed() {
  console.log("Seeding database...");

  const res = await fetch("https://fakestoreapi.com/products");
  const products: FakeStoreProduct[] = await res.json();

  const categoryMap = new Map<string, string>();

  for (const product of products) {
    let categoryId = categoryMap.get(product.category);

    if (!categoryId) {
      const slug = product.category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const [inserted] = await db
        .insert(schema.categories)
        .values({
          name: product.category,
          slug,
          imageUrl: product.image,
        })
        .returning();

      if (inserted) {
        categoryId = inserted.id;
        categoryMap.set(product.category, categoryId);
      }
    }

    const slug = product.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    await db.insert(schema.products).values({
      name: product.title,
      slug: `${slug}-${product.id}`,
      description: product.description,
      price: product.price.toFixed(2),
      images: [product.image],
      categoryId: categoryId || null,
      stock: Math.floor(Math.random() * 100) + 10,
    });
  }

  console.log(`Seeded ${products.length} products.`);
  console.log(`Seeded ${categoryMap.size} categories.`);
}

seed().catch(console.error);
