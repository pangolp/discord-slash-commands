const Discord = require("discord.js")

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Enseña tu avatar de discord.")
    .addUserOption((option) =>
        option
            .setName("user")
            .setDescription("Usuario cuyo avatar quieres mostrar.")
    ),
    execute: async(interaction) => {
        const { user, client, guild } = interaction
        const imageProperties = { size: 1024, dynamic: true }
        const target = interaction.options.getUser("user") || user;
        const member = await guild.members.fetch(target.id)
        const avatar = member.avatarURL(imageProperties) || member.user.avatarURL(imageProperties)

        if (!avatar) return interaction.reply("Este usuario no tiene avatar.")
        
        const embed = new Discord.EmbedBuilder()
            .setAuthor({
                name: `Pedido por ${user.username}`,
                iconURL: user.avatarURL()
            })
            .setTitle(`Avatar de ${target.displayName}`)
            .setColor("Aqua")
            .setImage(avatar)
            .setFooter({
                text: client.user.username,
                iconURL: client.user.avatarURL()
            })

        interaction.reply({ embeds: [embed] }).catch(console.error)
    },
}
