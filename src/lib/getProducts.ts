import { supabase } from "./supabase.client";

export async function getProducts(id: number) {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("categoryId", id);

  return (
    products?.reduce((acc, curr) => {
      if (acc[curr.class]) {
        return {
          ...acc,
          [curr.class]: [...acc[curr.class], curr],
        };
      }
      return {
        ...acc,
        [curr.class]: [curr],
      };
    }, {}) ?? null
  );
}
