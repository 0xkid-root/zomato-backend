const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createFood } = require('../controllers/food.controller');
const { authFoodPartnerMiddleware } = require('../middlewares/auth.middleware');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // increased size
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith("video/")) {
            cb(null, true);
        } else {
            cb(new Error("Only video files are allowed"), false);
        }
    }
});

const validateFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "Video file is required" });
    }
    next();
};

router.post(
    '/',
    authFoodPartnerMiddleware,
    upload.single('video'),
    validateFile,
    createFood
);

module.exports = router;