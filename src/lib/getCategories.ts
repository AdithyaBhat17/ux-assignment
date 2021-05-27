import { supabase } from "./supabase.admin";

export async function getCategories(name: string = "") {
  const result = supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  return name ? await result.ilike("name", `%${name}%`) : await result;
}
