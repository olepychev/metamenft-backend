const express = require('express');
const router = express.Router();

const { generateCodes, test, checkCode, grantRole } = require("./controller");

router.get("/test", test);
router.get("/generateCodes", generateCodes)
router.get("/checkCode", checkCode);
router.get("/grantRole", grantRole);

module.exports = router;