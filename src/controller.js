const voucher_codes = require("voucher-code-generator");
const { writeCodesFromFile, readCodesFromFile, assignRoleToUser } = require("./utils");

const test = async (req, res) => {
    const _discordName = req.query.name;
    await assignRoleToUser(_discordName);
    res.send("Test OK");
}

const generateCodes = (req, res) => {
    try {
        const _codes = voucher_codes.generate({
            count: 2000,
            length: 20,
            pattern: "#####-#####-#####-#####"
        })
        console.log(_codes);
        const data = [];
        console.log("_codes.length = ", _codes.length);
        for (let i = 0; i < _codes.length; i++) {
            data.push({
                isUsed: 0, // 0: unused, 1: used
                code: _codes[i]
            })
        }
        writeCodesFromFile(data);
        res.json({
            success: true,
            data: data
        });
    } catch (err) {
        console.log("Sorry, not possible");
        console.log("error=", err);
        res.json({ success: false, data: "Sorry, not possible" })
    }
}

const checkCode = (req, res) => {
    try {
        const _code = req.query.code;
        let data = readCodesFromFile();
        console.log("_code=", _code);
        const _index = data.findIndex(item => item.code == _code);
        if(_index >= 0) {
            if(data[_index].isUsed == 1)  {
                res.json({success: false, data: "Your code is already used."});
                return;
            }
            data[_index] = {isUsed: 1, code: _code};
            // writeCodesFromFile(data);
            res.json({ success: true, data: "You'll get a WL role soon." });
        } else {
            res.json({success: false, data: "Your code is invalid."})
        }
    } catch (err) {
        console.log("setCodeUsed exception,", err);
        res.json({ success: false, data: "Unexpected Error."})
    }
}

module.exports = {
    test,
    generateCodes,
    checkCode
}