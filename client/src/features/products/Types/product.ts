export interface ProductImages {
  url: string;
  publicId: string;
}
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: ProductImages[];
}
export interface GetProductsResponse {
  statusCode: number;
  message: string;
  data: Product[];
  success: boolean;
}
export interface GetProductResponse {
  statusCode: number;
  message: string;
  data: Product;
  success: boolean;
}