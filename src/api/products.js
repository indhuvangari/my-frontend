

import { http } from "../lib/http";

export async function listProducts() {
  const { data } = await http.get("/products");
  return data;
}
