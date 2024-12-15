const nodemailer = require("nodemailer");

exports.sendMail = async (options) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, 
      port: process.env.EMAIL_PORT, 
      auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    
    const mailOptions = {
      from: `Your Service Name <${process.env.SENDER}>`, 
      to: options.to, 
      subject: options.subject, 
      text: options.message, 
    };

    
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};