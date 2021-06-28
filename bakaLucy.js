const {Client} = require('discord.js');
const client = global.client = new Client({ fetchAllMembers: true });
const lucy = require('./Source/Functions/Definition');

lucy.activateModeration();
lucy.commandsOn();
lucy.readyOn();
lucy.systemOn();
lucy.messageLog();
require("./Source/Functions/Utils");