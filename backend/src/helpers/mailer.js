import nodemailer from "nodemailer";

console.log(process.env.USER);
console.log(process.env.EMAIL);
console.log(process.env.PASS_EMAIL);

// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER,
    pass: process.env.PASS_EMAIL,
  },
});

try {
  await transporter.verify();
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed", err);
}
