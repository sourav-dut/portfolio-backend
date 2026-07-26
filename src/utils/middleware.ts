import type { MiddlewareHandler } from "hono";
import { auth } from "./auth.js";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  c.set("session", session?.session ?? null);
  c.set("user", session?.user ?? null);

  await next();
};