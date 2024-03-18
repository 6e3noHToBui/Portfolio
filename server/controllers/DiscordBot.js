const Discord = require('discord.js');
const client = new Discord.Client({ intents: 2048 });
const { EmbedBuilder } = require('discord.js');

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.login(process.env.BOT_TOKEN);

async function sendBotMessage(username, email, message,status){
    try {
        const channel = await client.channels.fetch(process.env.DS_CHANNEL_ID);
        if(status){
            title = 'New Message'
        }else{
            title = 'Update Message'
        }
        if (channel) {
            const embed = new EmbedBuilder()
                .setColor('#190747')
                .setTitle(`**${title}**`)
                .addFields({name: `**User name**`,value:`${username}`})
                .addFields({name: `**User email**`,value:`${email}`})
                .addFields({name: `**Message**`,value:`${message}`})
            channel.send({ embeds: [embed]});
            console.log(`Message sent`);
        } else {
            console.log(`Channel with this id is not found.`);
        }
    } catch (error) {
        console.log("Internal server error",error);
    }
}

module.exports = { sendBotMessage }