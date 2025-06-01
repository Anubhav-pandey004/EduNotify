const generateEmailMessage = require("./generateEmailMessage");
const sendEmail = require("./sendEmail");
const xlsx = require('xlsx');
const multer = require('multer');

// Define the upload destination
const uploaddoc = multer({ dest: 'uploads/' });

// Define the upload middleware
const upload = async(req, res) => {
    uploaddoc.single('excelFile')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file', error: err });
        }

        try {
            // Read the Excel file
            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

            const subjects = Object.keys(data[0]).filter(key => key.toLowerCase().endsWith('_score'));
            console.log("Subjects are " , subjects);
            
            // Loop through the data and send emails sequentially using async/await
            for (const el of data) {
                const results = generateEmailMessage(el,subjects);
                console.log("Result is :::",results);
                
                await sendEmail(results);  // Ensure each email is sent before moving to the next
            }

            // Send response only after all emails have been sent
            res.status(200).json({ success: true, message: 'File uploaded and all emails sent successfully' });
        } catch (error) {
            console.error("Error processing the file:", error);
            res.status(500).json({ success: false, message: 'Error processing file', error });
        }
    });
}

module.exports = upload;
