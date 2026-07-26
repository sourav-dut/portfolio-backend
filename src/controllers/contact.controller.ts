import { Context } from "hono";
import { ContactService } from "../services/contact.service.js";
import { EmailService } from "../services/email.service.js";

export const ContactController = {
  async create(c: Context) {
    try {
      const body = await c.req.json();

      console.log("Received contact message:", body);

      const contact = await ContactService.create(body);
      await EmailService.sendNewContactNotification(body);

      return c.json(
        {
          success: true,
          message: "Message sent successfully.",
          data: contact,
        },
        201
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to create message.",
        },
        500
      );
    }
  },

  async getAll(c: Context) {
    const contacts = await ContactService.getAll();

    return c.json({
      success: true,
      data: contacts,
    });
  },

  async getById(c: Context) {
    const id = c.req.param("id");

    const contact = await ContactService.getById(id);

    if (!contact) {
      return c.json(
        {
          success: false,
          message: "Contact not found.",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: contact,
    });
  },

  async update(c: Context) {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      const updated = await ContactService.update(id, body);

      return c.json({
        success: true,
        message: "Updated successfully.",
        data: updated,
      });
    } catch {
      return c.json(
        {
          success: false,
          message: "Update failed.",
        },
        500
      );
    }
  },

  async deleteById(c: Context) {
    try {
      const id = c.req.param("id");

      await ContactService.deleteById(id);

      return c.json({
        success: true,
        message: "Deleted successfully.",
      });
    } catch {
      return c.json(
        {
          success: false,
          message: "Delete failed.",
        },
        500
      );
    }
  },

  async deleteAll(c: Context) {
    await ContactService.deleteAll();

    return c.json({
      success: true,
      message: "All contacts deleted.",
    });
  },
};