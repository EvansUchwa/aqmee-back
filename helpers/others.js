const nodemailer = require("nodemailer");

// Golem@1234
async function sendEmail(to, subject, text, html) {
  try {
    // Créer un transporteur (SMTP)
    const transporter = nodemailer.createTransport({
      host: "mail.ecomplane.com", // Remplace par ton service SMTP (Gmail, Outlook, etc.)
      port: 587, // Port standard pour le SMTP
      secure: false, // false pour le port 587, true pour le port 465
      auth: {
        user: "contact@ecomplane.com", // Ton email
        pass: "Golem@1234", // Mot de passe ou clé d'API si tu utilises des services comme SendGrid
      },
    });

    // Options de l'email
    const mailOptions = {
      from: "Ecomplane <contact@ecomplane.com>", // Expéditeur
      to, // Destinataire(s)
      subject, // Sujet
      text, // Contenu textuel (pour les clients email qui ne supportent pas HTML)
      html, // Contenu HTML (pour les clients modernes)
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé : %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw error;
  }
}

// Exemple d'utilisation de la fonction
module.exports = {
  sendEmail,
};
