"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: FormData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return { success: false, error: "Missing required fields." };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email as string,
      subject: `New Project Inquiry from ${name}`,
      text: message as string,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Something went wrong. Try again." };
  }
}
