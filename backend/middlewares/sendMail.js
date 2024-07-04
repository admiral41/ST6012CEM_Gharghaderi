const nodeMail = require('nodemailer');

exports.sendEmail = async (options) => {
    const transporter = nodeMail.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        },
        service: process.env.SMTP_SERVICE,
    });
    const mailOptions = {
        from: process.env.SMTP_EMAIL, // Corrected from SMPT_MAIL to SMTP_EMAIL
        to: process.env.MY_EMAIL, // Assuming MY_EMAIL is your email where you want to receive the contact form data
        cc: process.env.CC_EMAIL, // Add the CC field here
        subject: options.subject,
        text: options.message,
    }
    await transporter.sendMail(mailOptions);
}
