const path = require('path');
const PdfModel = require('../../models/pdfmodel');
const fs = require('fs'); // Adjust the path as necessary

class PdfController {
    async upload(req, res) {
        try {
            const { title } = req.body;

            if (!req.file) {
                return res.status(400).send("No file uploaded.");
            }

            const newPdf = new PdfModel({
                filename: req.file.filename,
                path: `/uploads/pdfs/${req.file.filename}`, // ✅ match your multer destination
                title
            });

            await newPdf.save();

            res.status(200).send("PDF uploaded successfully.");
        } catch (error) {
            console.error("PDF upload error:", error);
            res.status(500).send("Something went wrong.");
        }
    }

    async list(req, res) {
        try {
            const pdfs = await PdfModel.find().sort({ createdAt: -1 });
            res.render('admin/newspaperuploade', { pdfs });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error fetching PDFs.');
        }
    }

    // Download controller (pdf.controller.js)
    async download(req, res) {
        try {
            const { id } = req.params;
            const pdf = await PdfModel.findById(id);
            if (!pdf) return res.status(404).send('PDF not found');
    
            const filePath = path.resolve('uploads/pdfs', pdf.filename);
            if (!fs.existsSync(filePath)) {
                return res.status(404).send('File not found on server.');
            }
    
            res.download(filePath, pdf.filename);
        } catch (error) {
            console.log("Download error:", error);
            res.status(500).send("Download failed");
        }
    }
    async ajaxList(req, res) {
        try {
          const pdfs = await PdfModel.find().sort({ createdAt: -1 });
          res.json({ pdfs });
        } catch (error) {
          console.log("AJAX PDF List Error:", error);
          res.status(500).json({ error: 'Error loading PDFs' });
        }
      }
      deltepdf = async(req, res) => {
        try {
            const { id } = req.params;
            const pdf = await PdfModel.findById(id);
            if (!pdf) return res.status(404).send('PDF not found');
    
            const filePath = path.resolve('uploads/pdfs', pdf.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Delete the file from the server
            }
    
            await PdfModel.findByIdAndDelete(id); // Delete the record from the database
             res.redirect('/admin/list')
            
        } catch (error) {
            console.log("Delete PDF Error:", error);
            res.redirect('/admin/list')
        }
        
      }
}

module.exports = new PdfController();
