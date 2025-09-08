import ProductPage from "./ProductPage";

// Static params generate for GitHub Pages (static export)
// export async function generateStaticParams() {
//   const res = await fetch("https://fakestoreapi.com/products");
//   const data = await res.json();
//   console.log(data);
//   return data.map((product: { id: number }) => ({
//     id: product.id.toString(),
//   }));
// }

export default function Page({ params }: { params: { id: string } }) {
  return <ProductPage id={params.id} />;
}
