import ProductPage from "./ProductPage";

// Static params generate for GitHub Pages (static export)
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.in/api/products?limit=10");
  const data = await res.json();

  return data.products.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <ProductPage id={params.id} />;
}
