import { useEffect, useState } from "react";
import { getProducts } from "../lib/getProducts";
import { ProductsResponse } from "../types/api";

export function useProducts(categoryId: number) {
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [products, setProducts] =
    useState<{ [key: string]: ProductsResponse[] } | null>(null);

  useEffect(() => {
    setStatus("loading");
    async function fetchData() {
      const products = await getProducts(categoryId);
      setProducts(products);
      setStatus("idle");
    }

    fetchData();
  }, [categoryId]);

  const isLoading = status === "loading";
  const isError = status === "error";
  const isSuccess = status === "success";
  const isIdle = status === "idle";

  return {
    products,
    isLoading,
    isError,
    isSuccess,
    isIdle,
  };
}
