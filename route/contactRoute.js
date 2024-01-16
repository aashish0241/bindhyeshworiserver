const express = require("express");
const { postMessage, deletePost, getContact } = require("../controller/contactController");
const {adminOnly} = require('../middleware/adminhandle');


const router = express.Router();

router.post("/add", postMessage);
router.get("/message", getContact);
router.delete('/delete/:id',  deletePost);

module.exports = router;
