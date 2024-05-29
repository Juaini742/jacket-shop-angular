import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface NavType {
  path: string;
  name: string;
  requiresAuth?: boolean;
}

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Category {
  id?: string;
  name: string;
}

interface Color {
  name: string;
}

interface Size {
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  brand: string;
  material: string;
  image: string;
  description: string;
  returnPolicy: string;
  category_id: string;
  category: Category;
  color: Color[];
  size: Size[];
}

export type Products = {
  products: Product[];
  page: number;
  totalPage: number;
  totalProducts: number;
};

export type Categories = Category[];

export interface Article {
  img: string;
  title: string;
}

export interface Gallery {
  img: string;
}

export interface UserType {
  id?: string;
  username: string;
  born?: string;
  gender?: string;
  phone?: string;
  job?: string;
  email: string;
  createdAt?: string;
}

export interface CartType {
  id: string;
  quantity: number;
  size: string;
  color: string;
  product: Product;
}

export type CartsType = CartType[];

export interface AddressType {
  id: string;
  prov: string;
  regency: string;
  subdistrict: string;
  district: string;
  completeAddress: string;
}
