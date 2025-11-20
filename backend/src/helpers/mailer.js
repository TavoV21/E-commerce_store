import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

console.log(process.env.APIKEY_BREVO);
console.log(process.env.EMAIL);

let emailAPI = new TransactionalEmailsApi();
emailAPI.authentications.apiKey.apiKey = process.env.APIKEY_BREVO;

export async function sendEmailInbox(recipientEmail) {
  let message = new SendSmtpEmail();
  message.subject = "Restablecer Contraseña";
  message.textContent = "Hello world!";
  message.sender = { name: "JJ EnigmaticStore", email: process.env.EMAIL };
  message.to = [{ email: recipientEmail }];
  message.htmlContent = ` 
    <html><head><meta charset="UTF-8"></head><body>
  <h2 style:"border: 2px inset rgba(128, 119, 119, 0.61) ">Click en el enlace para cambiar su contraseña</h2> 
  <a href="https://enigmaticstore.onrender.com/changePassword/${recipientEmail}" id="boton" style="cursor:pointer; font-style:italic;color:rgb(137, 45, 223)">Cambiar contraseña</a>
    </body></html>
  `;

  try {
    const response = await emailAPI.sendTransacEmail(message);
    console.log(JSON.stringify(response.body));
  } catch (error) {
    console.error("Error sending email:", err.body);
  }
}
