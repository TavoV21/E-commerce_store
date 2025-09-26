import nodemailer from "nodemailer";

console.log(process.env.EMAIL);
console.log(process.env.PASS_EMAIL);

// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});
