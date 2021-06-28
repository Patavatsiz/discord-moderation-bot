const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  Event: "ytses",
  Komut: ["yetkilises", "yses"],
  Kullanim: ".ytses",
  Acıklama: "Seste olan/olmayan yetkilileri gösterir",
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
  onRequest: async function(client, message, args) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));
    if (![lucy.roller.enAltYetkiliRolü].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: Bu komudu kullanamazsın")).sil(7);

    let OnVoice = message.guild.members.cache.filter(x => x.roles.highest.position >= message.guild.roles.cache.get(lucy.roller.enAltYetkiliRolü).position).filter(x => x.voice.channel).map(x => x).join("\n");
    let UnVoice = message.guild.members.cache.filter(x => x.roles.highest.position >= message.guild.roles.cache.get(lucy.roller.enAltYetkiliRolü).position).filter(x => !x.voice.channel).map(x => x).join("\n");

    message.channel.wsend(
    embed
    .setTitle(`${message.guild.name} Sunucusunun yetkili seste bulunma durumu;`)
    .setDescription(`\`•\` Seste Bulunanlar:\n${OnVoice || "Bulunamadı"}\n\n\`•\` Seste Bulunmayanlar:\n${UnVoice || "Bulunamadı"}`))

  }
}