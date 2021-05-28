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
