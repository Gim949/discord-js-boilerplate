"use strict";
const dotenv = require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();

let cd = new Set();
var prefix = ""; // Prefix goes here
var commands = require("./commands.js");

bot.on("ready", () => console.log("I'm ready"));

bot.on("message", msg => {
    if(msg.author.bot && !msg.content.startsWith(prefix)) return;
    else if(cd.has(msg.author.id)) 
    {
        msg.channel.send("Command on cooldown!");
        return;
    }

    let args = msg.content.slice(prefix.length).trim().split(/ +/g),
        cmd = args.shift().toLowerCase();

    if(commands[cmd] !== undefined) commands[cmd](msg, bot, args);
    
    cd.add(msg.author.id);
    bot.setTimeout( () => {
        cd.delete(msg.author.id);
    }, 3000);
});

bot.login(process.env.TOKEN);