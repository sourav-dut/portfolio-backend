import { Hono } from "hono";
import { ContactController } from "../controllers/contact.controller.js";

const contactRoute = new Hono();

contactRoute.post("/", ContactController.create);

contactRoute.get("/", ContactController.getAll);

contactRoute.get("/:id", ContactController.getById);

contactRoute.patch("/:id", ContactController.update);

contactRoute.delete("/:id", ContactController.deleteById);

contactRoute.delete("/", ContactController.deleteAll);

export default contactRoute;