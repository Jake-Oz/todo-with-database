import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const dynamic = "force-dynamic";
export const dynamicParams = "true";
export const { GET, POST } = handlers;
