const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define storage settings for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'plotImage') { // Specifically handle plotImage field
      cb(null, "public/plots");
    } else {
      const fileType = file.mimetype.split('/')[0];
      if (fileType === 'image') {
        cb(null, "public/houseDoc/images");
      } else if (fileType === 'application' && file.mimetype.includes('pdf')) {
        cb(null, "public/houseDoc/pdfs");
      } else {
        cb(new Error("File type not supported."), null);
      }
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueFilename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueFilename);
  }
});

// Define file filter to accept only images, PDFs, and plot data
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/json'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported."), false);
  }
};

// Initialize multer with the configured settings
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB file size limit
}).fields([
  { name: 'images', maxCount: 25 },
  { name: 'propertyDocument', maxCount: 1 },
  { name: 'plotImage', maxCount: 1 }
]);

module.exports = upload;
