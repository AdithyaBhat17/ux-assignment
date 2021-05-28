import { AddProductInput, ProductInventory } from "../types";
import { supabase } from "./supabase.client";

export async function getProductInventory(type = "out of stock") {
  const isOutOfStock = type === "out of stock";

  const result = supabase
    .from("products")
    .select(
      "subscriptions (phone), name, remaining, class, id, categories (name)"
    );

  const { data } = isOutOfStock
    ? await result.eq("remaining", 0)
    : await result.eq("categories.name", type);

  return (data as ProductInventory[])
    ?.filter((p) => Boolean(p.categories?.name))
    .map((product) => {
      let { subscriptions } = product;
      delete product.subscriptions;

      return {
        ...product,
        requests: new Set(subscriptions?.map((sub) => sub.phone)).size,
      };
    });
}

export async function editStock(productId: number, remaining: number) {
  return await supabase
    .from("products")
    .update({ remaining }, { returning: "representation" })
    .eq("id", productId);
}

export async function createProduct({
  name,
  remaining,
  categoryId,
  tag,
}: AddProductInput) {
  return await supabase.from("products").insert({
    name,
    remaining,
    categoryId,
    class: tag,
  });
}
