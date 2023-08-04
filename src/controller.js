const voucher_codes = require("voucher-code-generator");
const { writeCodesFromFile, readCodesFromFile, assignRoleToUser, hasRole } = require("./utils");

const test = async (req, res) => {
    // const _discordName = req.query.name;
    // await assignRoleToUser(_discordName);
    // const result = await hasRole(_discordName);
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

const checkCode = async (req, res) => {
    try {
        const _code = req.query.code;
        console.log("_code=", _code);
        let data = readCodesFromFile();
        const _index = data.findIndex(item => item.code == _code);
        if(_index >= 0) {
            if(data[_index].isUsed == 1)  {
                res.json({success: false, data: "Your code is already used."});
                return;
            }
            data[_index] = {isUsed: 1, code: _code};
            writeCodesFromFile(data);
            res.json({ success: true, data: "You'll get a WL role soon." });
        } else {
            res.json({success: false, data: "Your code is invalid."})
        }
    } catch (err) {
        console.log("setCodeUsed exception,", err);
        res.json({ success: false, data: "Unexpected Error."})
    }
}

const grantRole = async (req, res) => {
    try {
        const _code = req.query.code;
        const _discordName = req.query.name;
        console.log(">>>>>>>>> grantRole <<<<<<<<<<");
        console.log("_code=", _code);
        console.log("name=", _discordName);
        let data = readCodesFromFile();
        const _index = data.findIndex(item => item.code == _code);
        if(_index >= 0) {
            // if(data[_index].isUsed == 1)  {
                const {success, message} = await assignRoleToUser(_discordName);
                res.json({success, data: message});
                return;
            // }
        }
        res.json({ success: false, data: "Cannot grant the role with invalid code." });
    } catch (err) {
        console.log("grantRole exception,", err);
        res.json({ success: false, data: "Unexpected Error."})
    }
}

const getUserList = async (req, res) => {
    try {
        const {success, data} = await getUserList();
        res.json({success, data: data});
    } catch (err) {
        console.log("grantRole exception,", err);
        res.json({ success: false, data: err })
    }
}

module.exports = {
    test,
    generateCodes,
    checkCode,
    grantRole,
    getUserList
}