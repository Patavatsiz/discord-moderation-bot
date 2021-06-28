const { Message, MessageEmbed } = require("discord.js");

 /**
 * @param {Message} message 
 */

module.exports = (message) => {
    if (message.author.bot ||!message.content.startsWith(global.sistem.botPrefix) || !message.channel || message.channel.type == "dm") return;
    let args = message.content
      .substring(global.sistem.botPrefix.length)
      .split(" ");
    let komutcuklar = args[0];
    let bot = message.client;
    let lucy = global.lucy


      if([".tag","!tag"].includes(message.content.toLowerCase())){ 
          return message.channel.send(lucy.serverTag); 
      }
      
    args = args.splice(1);
    let calistirici;
    if (bot.aliases.has(komutcuklar)) {
      calistirici = bot.aliases.get(komutcuklar);
      if (message.member.roles.cache.has(lucy.roller.jailRolü) || message.member.roles.cache.has(lucy.roller.yasaklıTagRolü)) return;
          if(!lucy.kanallar.izinliKanallar.some(x => message.channel.id == x) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: \`Bu komutu sadece komut kanallarında kullanabilirsin.\``).sil(7)
      calistirici.onRequest(bot, message, args);
    } else if (bot.commands.has(komutcuklar)) {
      calistirici = bot.commands.get(komutcuklar);
      if (message.member.roles.cache.has(lucy.roller.jailRolü) || message.member.roles.cache.has(lucy.roller.şüpheliRolü) || message.member.roles.cache.has(lucy.roller.yasaklıTagRolü)) return;
           if(!lucy.kanallar.izinliKanallar.some(x => message.channel.id == x) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: \`Bu komutu sadece komut kanallarında kullanabilirsin.\``).sil(7)
      calistirici.onRequest(bot, message, args);
    }
}

module.exports.config = {
    Event: "message"
}