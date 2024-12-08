import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

export const sendEmail = async ({ to, subject, text, html }) => {

    const transporter = nodemailer.createTransport({
        service: 'iCloud',
        host: 'smtp.mail.me.com', // iCloud's SMTP server
        port: 587,  // Use port 587 for STARTTLS
        secure: false, // Use false for port 587
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL,
        }
      
    }
        // Ensure this logs the correct email address
);

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to,
        subject,
        text,
        html
    }

    try {
        const email = await transporter.sendMail(mailOptions);
        console.log("Email Sent", email.response);

    } catch (error) {
        console.error("Error sending email: ", error.message);
    }
}