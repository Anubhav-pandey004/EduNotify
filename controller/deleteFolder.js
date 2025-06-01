const fs = require("fs");
const path = require("path");
module.exports = deleteFolder=(req,res)=>{
    const uploadsPath = path.join(__dirname, "../uploads");

    fs.readdir(uploadsPath, (err, files) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Failed to read uploads folder." });
        }

        for (const file of files) {
            fs.unlink(path.join(uploadsPath, file), (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: "Error deleting files." });
                }
            });
        }

        res.json({ success: true, message: "Uploads folder cleared successfully." });
    });
}
