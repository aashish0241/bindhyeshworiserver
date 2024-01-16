const express = require('express');
const multer = require('multer');
const { addTeacher, getTeacher, deleteTeacher } = require('../controller/teacherController');
const { adminOnly } = require('../middleware/adminhandle');





const router = express.Router();

// Configure Multer for file upload with temporary storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add an event
router.post('/add', upload.single('file'),  addTeacher);
router.get('/teacher',  getTeacher);
router.delete('/delete/:id',   deleteTeacher);

module.exports = router;
