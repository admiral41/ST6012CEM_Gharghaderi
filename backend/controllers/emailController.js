const { sendEmail } = require('../middlewares/sendMail');

// POST /api/contact
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate if name, email, phone, and message are provided
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Send email using Nodemailer
    await sendEmail({
      email: process.env.MY_EMAIL, // Your email where you want to receive the contact form data
      subject: 'New Contact Form Submission',
      message: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    });

    res.status(200).json({ 
      success: true,
      message: 'Contact form submitted successfully.' 
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};

exports.scheduleVisitController = async (req, res) => {
  const { date, tourType, time, name, phone, email, message, houseName } = req.body;

  // Validate the form data if needed

  // Prepare the email message
  const subject = 'New Schedule Visit Request';
  const mailMessage = `
    Date: ${date}
    Tour Type: ${tourType}
    Time: ${time}
    Name: ${name}
    Phone: ${phone}
    Email: ${email}
    Message: ${message}
    House Name: ${houseName} 
  `;

  try {
    // Send the email
    await sendEmail({ subject, message: mailMessage });

    // You can also perform additional actions here, such as saving the form data to a database

    // Respond to the client
    res.status(200).json({ success: true, message: 'Schedule visit request submitted successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
  }
};
