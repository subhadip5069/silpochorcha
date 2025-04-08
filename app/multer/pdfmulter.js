const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pdfs');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const fileName = `shilpochorcha-${currentDate}-newsPaper${ext}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
