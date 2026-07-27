import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./utils/auth.js";
import { authMiddleware } from "./utils/middleware.js";
import { logger } from "hono/logger";
import contactRoute from "./routes/contact.route.js";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      "https://my-portfolio-webs-eight.vercel.app",
      "https://my-portfolio-webs-ith04kkp4-sourav-duttas-projects-75e33712.vercel.app",
      "https://my-portfolio-webs-git-main-sourav-duttas-projects-75e33712.vercel.app"
    ],
    credentials: true,
  }),
);
app.use("*", authMiddleware);
app.use(logger());

// apis
app.get("/", () => {
  return "hello portfolio";
});
app.route("/api/contact", contactRoute);

app.on(["GET", "POST"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;
