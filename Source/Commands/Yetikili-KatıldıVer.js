const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "katıldı",
  Komut: ["katıldıver"],
  Kullanim: ".katıldı",
  Acıklama: "Katıldı rolü verir.",
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
    if (![lucy.roller.ustYetkiliRolleri].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: bu komudu kullanamazsın.")).sil(5);
    
    if(!message.member.voice || message.member.voice.channelID != lucy.kanallar.toplantiOdasi) return;
    var alınacak = message.guild.members.cache.filter(x => x.roles.cache.has(lucy.roller.katildiRolu) && x.voice && x.voice.channelID != lucy.kanallar.toplantiOdasi).array().forEach((member, i) => {
      setTimeout(async() => {
        member.roles.remove(lucy.roller.katildiRolu)
      }, i * 1000)
    });

    var verilcek = message.guild.members.cache.filter(x => !x.roles.cache.has(lucy.roller.katildiRolu) && x.voice && x.voice.channelID == lucy.kanallar.toplantiOdasi).array().forEach((member, i) => {
      setTimeout(async () => {
        member.roles.add(lucy.roller.katildiRolu)
      }, i * 1000)
    });
    message.channel.wsend(`${lucy.emojiler.yes} Başarıyla ${verilcek.size} adet kullanıcıya katıldı rolü verildi ve ${alınacak.size} adet kullanıcıdan alındı.`).sil(7);
    message.react(lucy.emojiler.yes);
  }
}