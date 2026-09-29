import { Link } from "react-router-dom";

import { useGetProductsQuery } from "../api/productsApi";

import ProductCard from "./ProductCard";
function ProductGrid() {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>loading....</div>;

  return (
    <section
      className="
        mb-34 grid md:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6
      "
    >
      {products?.data.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </section>
  );
}

export default ProductGrid;
