const express = require("express");
const router = express.Router();


const UIPagesController = require("../../controller/user/pages.controller");
const national = require("../../models/national");
const PdfModel = require("../../models/pdfmodel");
const path = require("path");
const fs = require("fs"); // Adjust the path as necessary

router.get("/", UIPagesController.index);
router.get("/details", UIPagesController.details);
router.get("/international/:id", UIPagesController.detailINT);
router.get("/national/:id", UIPagesController.detailNAT);
router.get("/entertaitment/:id", UIPagesController.detailENT);
router.get("/sports/:id", UIPagesController.detailSPO);
router.get("/health/:id", UIPagesController.detailHEA);
router.get("/latestnews/:id", UIPagesController.detailLAT);
// pages routes
router.get("/international", UIPagesController.International);
router.get("/national", UIPagesController.National);
router.get("/entertaitment", UIPagesController.Entertainment);
router.get("/sports", UIPagesController.Sports);
router.get("/health", UIPagesController.Health);
router.get("/latestnews", UIPagesController.Latestnews);
router.get('/api/national', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 6;
      const skip = (page - 1) * limit;
  
      const news = await national.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
      res.json(news);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to load news' });
    }
  });
  

  
  router.get('/download/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const pdf = await PdfModel.findById(id);
      if (!pdf) return res.status(404).send('PDF not found');
  
      const filePath = path.resolve('uploads/pdfs', pdf.filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found on server.');
      }
  
      // Format the date
      const formattedDate = new Date(pdf.createdAt)
        .toLocaleDateString('en-GB') // dd/mm/yyyy
        .replace(/\//g, '-');         // Replace slashes with dashes
  
      // Create the custom filename
      const customFilename = `silpochorcha - ${formattedDate} - ${pdf.title}.pdf`;
  
      // Send the file with the custom filename
      res.download(filePath, customFilename);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;