const nodemailer = require('nodemailer');

module.exports = async function sendperEmail(emailData, res) {
    try {
        console.log(emailData.body);

        // Check if body is present and set emailData to emailData.body if necessary
        emailData = emailData.body ? emailData.body : emailData;
    
        // Check if email, subject, and message are provided
        if (!emailData.email || !emailData.subject || !emailData.message) {
            console.error('Missing required fields: email, subject, or message');
            return res.status(400).json({
                message: 'Missing required fields',
                error: true,
                success: false
            }); // Return error response if fields are missing
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
    
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    
        // Respond with success message
        return res.json({
            message: "Email sent successfully!",
            error: false,
            success: true
        });
    } catch (error) {
        console.error('Error sending email:', error);
    
        // Respond with error message
        return res.status(500).json({
            message: "Email not sent",
            error: true,
            success: false
        });
    }
};
