const fs = require('fs');
const path = require('path');
const {Client, Intents } = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const DISCORD_TOKEN = 'MTEzMDQ3MTA4OTYxMzU4MjQ0MA.GT_Y6_.3XtI34MnXhUxN6tge6Ez1b29TbP0E93cIMASTY';
const SERVER_ID = '1130468384883101826';
const roleId = '1130472564444110908';
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

const assignRoleToUser = async (username) => {
    try {
        const guild = client.guilds.cache.get(SERVER_ID);
        conosle.log("username=", username);
        console.log("guild =", guild);
        // const member = guild.members.cache.find((member) => member.user.username === username);
        // const member =await guild.members.fetch({force:true}).then((res) => {
        //     console.log("res=", res)
        //     return res;
        // }).catch(console.error)
        // const member = guild.members.cache.get('');
        // console.log("member=", member);
        // console.log('guild.members=', guild.members);
        // console.log("member=", member);
        // console.log("username=", username);
        // if (member) {
        //     const role = guild.roles.cache.get(roleId);
        //     await member.roles.add(role);
        //     console.log(`Successfully assigned the role to ${username}`);
        // } else {
        //     console.log("User not found");
        // }

    } catch (err) {
        console.error("Error assigning role ", err);
    }
}

module.exports = {
    readCodesFromFile,
    writeCodesFromFile,
    assignRoleToUser
}