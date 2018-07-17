const Discord = require("discord.js");

module.exports = {
    "ping": (msg, bot, args) => {
        msg.channel.send("Pong!");
    }
}