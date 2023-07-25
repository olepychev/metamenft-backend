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
        // let data = readCodesFromFile();
        let data = [
            {"isUsed":0,"code":"g68hA-dFpe6-Vbz1j-6UVjO"},{"isUsed":0,"code":"plMIl-GXtnV-VObhn-1VXfh"},{"isUsed":0,"code":"83lZ9-MOWXm-jYuiT-IcutT"},{"isUsed":0,"code":"rxspP-7yHcu-cpeRs-sPiAt"},{"isUsed":0,"code":"bwKsJ-XcJX1-NZCU7-autF0"},{"isUsed":0,"code":"bsSj1-v39Rl-jqIU3-ZsFXS"},{"isUsed":0,"code":"5v7uE-exiD3-ccOWe-SiQ6m"},{"isUsed":0,"code":"qlNJF-BboVr-0Oi5P-NKeXi"},{"isUsed":0,"code":"SKQEc-BBe7H-1UOaz-Ddjq1"},{"isUsed":0,"code":"TOUU1-M4HxJ-dKz3F-wEyQk"},{"isUsed":0,"code":"fz62i-kQ6mm-a0Edm-4xn59"},{"isUsed":0,"code":"C69XV-3VoO0-5k5GV-jeUdQ"},{"isUsed":0,"code":"KLw9S-Asipg-INdV1-oW4bY"},{"isUsed":0,"code":"C87I8-ZaCTX-AReAp-YDyYt"},{"isUsed":0,"code":"5hwZq-Suenr-rnnR6-OWUMN"},{"isUsed":0,"code":"NLzHM-h9vli-GyN4V-YrLkP"},{"isUsed":0,"code":"HcCUI-Jo23o-nMRK4-CtP3z"},{"isUsed":0,"code":"RocPb-enoeW-JDRZ4-YRsq6"},{"isUsed":0,"code":"g2tva-qq3ng-KFFRW-TSpLF"},{"isUsed":0,"code":"9xbqD-KTn7A-b0r73-BSEnq"},{"isUsed":0,"code":"CARtC-dJXi9-CcjtU-mQbqP"},{"isUsed":0,"code":"43OnF-9ImTa-XMn5l-DPiks"},{"isUsed":0,"code":"V7NOt-BsnoA-a8smF-drdUt"},{"isUsed":0,"code":"7i2Sw-Z6tw1-AwRK0-r6eAX"},{"isUsed":0,"code":"pdRFD-fPJwB-punbn-Bkulp"},{"isUsed":0,"code":"VkcNY-akSVC-3Dyvc-owDyA"},{"isUsed":0,"code":"uwkvw-cHzzW-zvnvj-LjvyS"},{"isUsed":0,"code":"xu1Q9-F7hPt-2vbPH-cvUgy"},{"isUsed":0,"code":"VP36M-KfWNH-B36K7-wCtlU"},{"isUsed":0,"code":"tLAcr-Jou7G-Vcc2S-qpnID"},{"isUsed":0,"code":"zXipP-5YJj9-NWjAg-rkBZ8"},{"isUsed":0,"code":"CwD5x-UDR2Y-VJ71A-FktPf"}
        ];
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
        res.json({ success: false, data: err})
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
            if(data[_index].isUsed == 1)  {
                const {success, message} = await assignRoleToUser(_discordName);
                res.json({success, data: message});
                return;
            }
        }
        res.json({ success: false, data: "Cannot grant the role with invalid code." });
    } catch (err) {
        console.log("grantRole exception,", err);
        res.json({ success: false, data: "Unexpected Error."})
    }
}

module.exports = {
    test,
    generateCodes,
    checkCode,
    grantRole
}