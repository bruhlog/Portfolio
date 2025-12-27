"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { rateLimit } from "@/app/lib/rateLimit";
const ip = headers().get("x-forwarded-for") || "unknown";

if (!rateLimit(ip)) {
  return { success: false, error: "Too many requests. Please wait." };
}


export async function sendEmail(formData: FormData) {
  try {
    const token = formData.get("recaptchaToken");

    if (!token) {
      return { success: false };
    }

    // Verify reCAPTCHA
    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const captchaData = await captchaRes.json();

    // Score check (v3)
    if (!captchaData.success || captchaData.score < 0.5) {
      return { success: false };
    }

    // Send email
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
      subject: "New Portfolio Inquiry",
      text: formData.get("message") as string,
    });

    return { success: true };
  } catch {
    return { success: false };
  }
}
