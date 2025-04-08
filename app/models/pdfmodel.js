const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    filename:{
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
},{
    timestamps: true
})
const PdfModel = mongoose.model('PdfModel', schema);
module.exports = PdfModel;