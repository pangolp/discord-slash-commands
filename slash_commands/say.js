const Discord = require("discord.js")

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("say")
    .setDescription("El bot dirá lo que tu desees.")
    .addStringOption((option) =>
        option
            .setName("mensage")
            .setDescription("Mensaje que repetira el bot.")
            .setMinLength(5)
            .setMaxLength(100)
            .setRequired(true)
    ),
    execute: async (interaction) => {
        const text = interaction.options.getString("mensage")
        interaction.reply(text).catch(console.log)
    },
}
