const nodemailer = require("nodemailer");

exports.sendMail = async (options) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // Your email service host
      port: process.env.EMAIL_PORT, 
      auth: {
        user: process.env.EMAIL_USERNAME, // Email username (from env)
        pass: process.env.EMAIL_PASSWORD, // Email password (from env)
      },
    });

    
    const mailOptions = {
      from: `Your Service Name <${process.env.SENDER}>`, // Sender's name and email (from env)
      to: options.to, // Recipient's email
      subject: options.subject, // Email subject
      text: options.message, // Plain text body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};