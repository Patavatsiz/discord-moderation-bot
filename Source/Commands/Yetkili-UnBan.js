const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "unban",
  Komut: ["bankaldır"],
  Kullanim: ".unban @user/ID",
  Acıklama: "Kullanıcının banını kaldırır.",
  Kategori: "Yetkili",

  /**
   * 
   * @param {Client} client 
   */
  onLoad: function(client) {

  },

  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @returns {Promise<void>}
   */
  onRequest: async function(client, message, args) {

    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));
    if (![lucy.roller.banYetkilileri].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: bu komudu kullanamazsın.")).sil(5);
    let cezano = lucyDatabase.cezaNo() + 1;

    let user = await client.users.fetch(args[0]);
    if(!args[0]) return message.channel.wsend(embed.setDescription(`Lütfen bir kullanıcı belirtin.`)).sil(7);
    if(isNaN(args[0])) return message.channel.wsend(embed.setDescription(`Lütfen geçerli bir kullanıcı idsi girin.`)).sil(7)
    for (i = cezano; i > 0; i--) {
    await lucyDatabase.banKaldir(i)
    message.guild.members.unban(user.id);
    message.react(lucy.emojiler.yes)
    message.guild.unlog("ban-log", user, message.author, "unban", cezano)
    message.channel.wsend(`${lucy.emojiler.yes} | \`${args[0]}\` ID'li kullanıcının banı ${message.author} tarafından kaldırıldı.`).sil(8);
    break;
    }
  }
}