export type PostgrestError = {
  message: string;
  details: string;
  hint: string;
  code: string;
};

export interface ProductsResponse {
  id: number;
  name: string;
  categoryId: number;
  remaining: number;
  class: string;
}

export interface ProductInventory {
  id: number;
  subscriptions?: {
    phone: string;
  }[];
  name: string;
  remaining: number;
  class: string;
  requests: number;
  categories: { name: string } | null;
}
[];

export interface AddProductInput {
  name: string;
  categoryId: number;
  remaining: number;
  tag: string;
}

export type AddProductFormInputs = {
  [key in keyof AddProductInput]: { value: AddProductInput[key] };
};
