const express = require('express');
const router = express.Router();

const { generateCodes, test, checkCode } = require("./controller");

router.get("/test", test);
router.get("/generateCodes", generateCodes)
router.get("/checkCode", checkCode);

module.exports = router;