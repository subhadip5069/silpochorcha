const express = require('express');
const router = express.Router();

const pdfController = require('../../controller/admin/pdf.controller');
const uploadpdf = require('../../multer/pdfmulter');


// Route to upload a PDF
router.post('/upload', uploadpdf.single('filename'), pdfController.upload);

// Route to list all PDFs
router.get('/list', pdfController.list);
router.get('/list-ajax', pdfController.ajaxList);

  

// Route to download a PDF
router.get('/download/:id', pdfController.download);

// Route to delete a PDF
router.get('/delete/:id', pdfController.deltepdf);

module.exports = router;