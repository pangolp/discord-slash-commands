const Discord = require("discord.js")

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("random")
        .setDescription("genera un numero entre 1 y 10"),
    execute: async (interaction) => {
        const randomNum = Math.floor(Math.random() * 10);
        interaction
            .reply(`Tu número es: ${randomNum}`)
            .catch(console.error);
    },
};
