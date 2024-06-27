const discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new discord.Client({
    intents: 3276799,
});

client.commands = new discord.Collection();

fs.readdirSync("./slash_commands").forEach((commandfile) => {
    const command = require(`./slash_commands/${commandfile}`);
    client.commands.set(command.data.name, command);
});

const REST = new discord.REST().setToken(config.token);

(async () => {
    try {
        await REST.put(
            discord.Routes.applicationGuildCommands(config.clientId, config.guildId),
            {
                body: client.commands.map((cmd) => cmd.data.toJSON()),
            }
        );
        console.log(`loaded ${client.commands.size} slash commands {/}`);
    } catch (error) {
        console.log("Error loading commands.", error);
    }
})();

client.on("ready", async (client) => {
    console.log("Bot Online!");
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        command.execute(interaction).catch(console.log);
    }
});

client.login(config.token);
