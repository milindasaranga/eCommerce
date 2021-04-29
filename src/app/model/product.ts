export interface Product {
  idProduct: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  discount: number;
  brand: string;
  color: string[];
  soldBy: string;
}

export interface Result {
  status: number;
  message: string;
  result;
  time: string;
  args;
}

export class SortingTypes {
  static priceHighLow: string = "1";
  static priceLowHigh: string = "2";
  static discountHighLow: string = "3";
}

export interface FilterBy{
  id: number;
  itemName: string;
  facets: string;
}