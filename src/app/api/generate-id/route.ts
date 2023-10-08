import { generateId } from "@/utilities/id";

export const GET = () =>
  new Response(Array.from({ length: 50 }, () => generateId()).join("\n"));
