const fs = require('fs');
const path = require('path');
const {Client, Intents, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	]
});

// MY DISCORD SETTING INFO
const DISCORD_TOKEN = 'MTEzMzE0NzY2NTYzNTQ4NzkwOA.GAX1hS.ad8GNc7nn2meE-HVuKDT-Vut-RsRSqTlOZyT9M';
const SERVER_ID = '1133139437086310430';
const roleId = '1133142527642435764';

client.login(DISCORD_TOKEN);

const dataPath = path.join(__dirname, `data.json`);

const readCodesFromFile = () => {
    if (fs.existsSync(dataPath)) {
        return JSON.parse(fs.readFileSync(dataPath));
    }
}

const writeCodesFromFile = (json) => {
    fs.writeFileSync(dataPath, JSON.stringify(json));
}

const getUserListFromSever = async () => {
    try {
        const guild = client.guilds.cache.get(SERVER_ID);
        const members = await guild.members.fetch();
        const member = members.map(item => item.user.username);
        return {
            success: true,
            data: member
        }
    } catch (err) {
        console.error("Error assigning role ", err);
        return {
            success: false,
            data: err,   
        }
    }
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
                message: "You get the Developer role successfully!"
            }
        }
        return {
            success: false,
            message: "You can't get the Developer role. Please contact with the support team."
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
    hasRole,
    getUserListFromSever
}