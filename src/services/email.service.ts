import { resend } from "../utils/resend.js";

export const EmailService = {
  async sendNewContactNotification(data: {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",

      // your email
      to: "souravduttak9@gmail.com",

      subject: `📩 New Contact: ${data.subject}`,

      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${data.fullName}</p>

        <p><strong>Email:</strong> ${data.email}</p>

        <p><strong>Subject:</strong> ${data.subject}</p>

        <p><strong>Message:</strong></p>

        <p>${data.message.replace(/\n/g, "<br/>")}</p>
      `,
    });
  },
};