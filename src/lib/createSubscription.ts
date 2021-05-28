import { supabase } from "./supabase.client";

interface SubscriptionInput {
  phone: string;
  whatsapp: boolean;
  productId: number;
}

export async function createSubscription({
  phone,
  whatsapp,
  productId,
}: SubscriptionInput) {
  return await supabase.from("subscriptions").insert({
    phone,
    whatsapp,
    productId,
  });
}
