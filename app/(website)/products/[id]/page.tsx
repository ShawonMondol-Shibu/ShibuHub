import ProductPage from "./ProductPage";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return <ProductPage id={id} />;
}
