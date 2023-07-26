const fs = require('fs');
const path = require('path');
const {Client, Intents, GatewayIntentBits } = require('discord.js');

// const client = new Client({
//     intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]
// });

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	]
});
// MY DISCORD SETTING INFO
// const DISCORD_TOKEN = 'MTEzMzE0NzY2NTYzNTQ4NzkwOA.G_creS.6rh_ZQRRqmBHnPKxcxswBFfG7iXfVc3GlewtNk';
// const SERVER_ID = '1133139437086310430';
// const roleId = '1133142527642435764';

const DISCORD_TOKEN = 'MTEyNTM5NTc5Nzk0OTgyMTAyOA.GEFpbm.kP8uK5CsXMmzItyX7_WU1xFmzaZdm9t0S9K7bk';
const SERVER_ID = '1098293068932857866';
const roleId = '1098704644982710272';
client.login(DISCORD_TOKEN);

const dataPath = path.join(__dirname, `data.json`);

const readCodesFromFile = () => {
	return [
		{"isUsed":0,"code":"g2tva-qq3ng-KFFRW-TSpLF"},
		{"isUsed":0,"code":"9xbqD-KTn7A-b0r73-BSEnq"},
		{"isUsed":0,"code":"CARtC-dJXi9-CcjtU-mQbqP"},
		{"isUsed":0,"code":"43OnF-9ImTa-XMn5l-DPiks"},
		{"isUsed":0,"code":"V7NOt-BsnoA-a8smF-drdUt"},
		{"isUsed":0,"code":"7i2Sw-Z6tw1-AwRK0-r6eAX"},
		{"isUsed":0,"code":"pdRFD-fPJwB-punbn-Bkulp"},
		{"isUsed":0,"code":"VkcNY-akSVC-3Dyvc-owDyA"},
		{"isUsed":0,"code":"uwkvw-cHzzW-zvnvj-LjvyS"},
		{"isUsed":0,"code":"xu1Q9-F7hPt-2vbPH-cvUgy"},
		{"isUsed":0,"code":"VP36M-KfWNH-B36K7-wCtlU"},
		{"isUsed":0,"code":"tLAcr-Jou7G-Vcc2S-qpnID"},
		{"isUsed":0,"code":"zXipP-5YJj9-NWjAg-rkBZ8"},
		{"isUsed":0,"code":"CwD5x-UDR2Y-VJ71A-FktPf"},
		{"isUsed":0,"code":"h9BRL-VKIls-PkJiC-vXp04"},
		{"isUsed":0,"code":"B06zW-4hiJ1-jBVOI-VVcr3"}
	]
    // if (fs.existsSync(dataPath)) {
    //     return JSON.parse(fs.readFileSync(dataPath));
    // }
}

const writeCodesFromFile = (json) => {
    // fs.writeFileSync(dataPath, JSON.stringify(json));
}

const assignRoleToUser = async (username) => {
    try {
        const guild = client.guilds.cache.get(SERVER_ID);
        const members = await guild.members.fetch();
        const member = members.filter(item => item.user.username == username);
        console.log("member=", member);
        console.log("Permissions=", member.permissions);
        if(member.size == 0) {
            console.log("User not found");
        } else {
            // const roles = await guild.roles.fetch();
            // const wlRole = roles.filter(item => item.name == "WL");
            // console.log("WLRole=", wlRole);
            const role = guild.roles.cache.get(roleId);
            // console.log("role=", role);
            await member.forEach(async (mem) => {
                console.log("mem=", mem);
                await mem.roles.add(role).catch(err => console.log("error=", err));
                console.log(`Successfully assigned the role to ${username}`);
            })
            return {
                success: true,
                message: "You get the WL role successfully!"
            }
        }
        return {
            success: false,
            message: "You can't get the WL role. Please contact with the support team."
        }
    } catch (err) {
        console.error("Error assigning role ", err);
        return {
            success: false,
            message: err
        }
    }
}

const hasRole = async (username) => {
    try {
        const guild = client.guilds.cache.get(SERVER_ID);
        const members = await guild.members.fetch();
        const member = members.filter(item => item.user.username == username);
        if(member.size == 0) {
            console.log("User not found");
            return false;
        } else {
            const role = guild.roles.cache.get(roleId);
            // console.log("role=", role);
            member.forEach(async (mem) => {
                // console.log("mem=", mem);
                const res = await mem.roles.cache.some(r => r.name == 'aaa')
                return res;
            })
        }
        return false;
    } catch (err) {
        console.error("Error checking role", err);
        return false;
    }
}

module.exports = {
    readCodesFromFile,
    writeCodesFromFile,
    assignRoleToUser,
    hasRole
}