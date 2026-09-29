import { useParams } from "react-router-dom";

import DefaultLayout from "@/layouts/default";

function ProductDetails() {
  const { id } = useParams();


  return <DefaultLayout>ProductDetails {id}</DefaultLayout>;
}

export default ProductDetails;
