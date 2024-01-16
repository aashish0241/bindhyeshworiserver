const express = require('express');
const multer = require('multer');
const { addStudy, getStudy, deleteStudy } = require('../controller/studyController');
const { adminOnly } = require('../middleware/adminhandle');





const router = express.Router();

// Configure Multer for file upload with temporary storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add an event
router.post('/add', upload.single('file'), addStudy);
router.get('/study',  getStudy);
router.delete('/delete/:id',  deleteStudy);

module.exports = router;
