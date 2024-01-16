const express = require("express");
const serverless = require('serverless-http');
const app = express();

const router = express.Router()
router.get("/", (req, res) => res.send("Hello World!"));

app.use("/.netfily/function/api", router);

export const handler = serverless(app);