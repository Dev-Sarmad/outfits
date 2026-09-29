import { Card } from "@heroui/react";

import { Product } from "../Types/product";

interface IProduct {
  product: Product;
}
function ProductCard({ product }: IProduct) {
  return (
    <>
      <Card className="h-full rounded-none">
        <img
          alt={product.title}
          className="
          h-48
            w-full
            object-cover
            aspect-auto          "
          src={product.images[0]?.url}
        />
        <Card.Content className="p-0">
          <div className="p-4 flex justify-between items-center ">
            <Card.Title className="">{product.title}</Card.Title>

            <p className=" font-semibold">${product.price}</p>
          </div>
          <Card.Description className="mt-2">
            {product.description}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
}

export default ProductCard;
