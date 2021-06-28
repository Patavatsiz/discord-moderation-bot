const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  Event: "yetkili",
  Komut: ["yetkili-say", "yetkilisay"],
  Kullanim: ".yetkili || .yetkili duyuru",
  Acıklama: "Yetkililerin kullanabileceği yetkili say komutudur.",
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
   * @param {Array<Sting>} args 
   */
  onRequest: function (client, message, args) {
    let embed = new MessageEmbed().setColor("RANDOM");

  
    if (![lucy.roller.ustYetkiliRolleri].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return;
    var Online = message.guild.members.cache.filter(x => !x.user.bot && x.presence.status != "offline" && x.roles.highest.position >= message.guild.roles.cache.get(lucy.roller.enAltYetkiliRolü).position).size.toString();
      var Yetkili = message.guild.members.cache.filter(x => !x.user.bot && x.roles.highest.position >= message.guild.roles.cache.get(lucy.roller.enAltYetkiliRolü).position).size.toString();
    var Offline = Yetkili.length - Online.length
      var Sesli = message.guild.members.cache.filter(x => !x.user.bot && x.voice.channel && x.roles.highest.position >= message.guild.roles.cache.get(lucy.roller.enAltYetkiliRolü).position).size.toString();
      var Onlinebns = message.guild.members.cache.filter(x => !x.user.bot && x.presence.status != "offline" && x.roles.highest.position >= message.guild.roles.cache.get(lucy.roller.enAltYetkiliRolü).position && !x.voice.channel).size.toString();
  

    message.channel.wsend(embed.setDescription(`
\`>\` Sunucumuzda toplam **${Yetkili}** adet yetkili bulunmakta.
\`>\` Yetkililerimizin **${Online}** adedi online, **${Offline}** adedi offline.
\`>\` Yetkililerimizin **${Sesli}** adedi sesli kanallarda.
\`>\` Aktif olan yetkililerimizden **${Onlinebns}** adedi sesli kanallarda değil.`))
    

  }
}
