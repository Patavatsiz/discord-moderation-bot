const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "kilit",
  Komut: ["lock"],
  Kullanim: ".kilit",
  Acıklama: "Bulunduğu kanalı kitler",
  Kategori: "Yetkili",

  /**
   *
   * @param {Client} client
   */
  onLoad: function (client) {

  },

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Array<String>} args
   * @returns {Promise<void>}
   */
  onRequest: async function (client, message, args) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.wsend(embed.setDescription("Hata: Bu komudu kullanamazsın")).sil(7);
    var ever = message.guild.roles.cache.find(evry => evry.name === "@everyone");
    if (args[0] && args[0].toLocaleLowerCase().includes('aç' || 'on')) {
    message.channel.updateOverwrite(ever, { 'SEND_MESSAGES': null })
    message.react(lucy.emojiler.yes);
    } else if (args[0] && args[0].toLocaleLowerCase().includes('kapat' || 'off')) {
      message.channel.updateOverwrite(ever, { 'SEND_MESSAGES': true })
      message.react(lucy.emojiler.yes);
    } else if(!args[0]) return message.channel.wsend(embed.setDescription(`Hata: bir işlem belirtin => .kilit aç/on - kapat/off`)).sil(7);
  }
}