const nodemailer = require('nodemailer');

module.exports = async function sendEmail(emailData) {
    console.log(emailData.body);

    // Check if body is present and set emailData to emailData.body if necessary
    emailData = emailData.body ? emailData.body : emailData;

    // Check if email, subject, and message are provided
    if (!emailData.email || !emailData.subject || !emailData.message) {
        console.error('Missing required fields: email, subject, or message');
        return { success: false, message: 'Missing required fields' }; // Return error response if fields are missing
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "anubhavpandeyayush@gmail.com", // Change this to a proper sender email address
        to: emailData.email,
        subject: emailData.subject,
        text: emailData.message
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return { success: true, message: 'Email sent successfully!' }; // Return success response if email is sent
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send email. Please try again.' }; // Return error response on failure
    }
}
