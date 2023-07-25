const fs = require('fs');
const path = require('path');
const {Client, Intents } = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]
});
const DISCORD_TOKEN = 'MTEzMDUzNjk5Mzk0MDU4MjUzMA.GmkpaH.EfHovQBhqczbeRJkk365uuj4XsJWEYn8T0qbuo';
const SERVER_ID = '1130468384883101826'; // 1130468386128797829  1130468384883101826 
const roleId = '1130834928028889220'; // WL:1130472564444110908   aaaa:1130834928028889220
client.login(DISCORD_TOKEN);

// const dataPath = path.join(__dirname, `data.json`);
const dataPath = path.join(process.cwd(), 'files', 'data.json');

const readCodesFromFile = () => {
    if (fs.existsSync(dataPath)) {
        // return JSON.parse(fs.readFileSync(dataPath));
        return JSON.parse({open: dataPath});
    }
}

const writeCodesFromFile = (json) => {
    fs.writeFileSync(dataPath, JSON.stringify(json));
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
            message: "Exception error occured. Please try again later."
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