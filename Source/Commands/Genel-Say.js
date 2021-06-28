const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  Event: "say",
  Komut: [""],
  Kullanim: ".say",
  Acıklama: "Herkesin kullanabileceği temel say komutudur.",
  Kategori: "Genel",

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
   * @param {Array<Sting>} args 
   */
  onRequest: function(client, message, args) {
    let embed = new MessageEmbed().setColor("RANDOM");

    var Online = message.guild.members.cache.filter(x => x.presence.status != "offline").size.toString();
    var OnVoice = message.guild.members.cache.filter(x => x.voice.channel).size.toString();
    var Boost = message.guild.premiumSubscriptionCount;
    var BoostLevel = message.guild.premiumTier;

    message.channel.wsend(embed.setDescription(`\`>\` Sunucumuzta toplam **${message.guild.memberCount}** (**${Online}** Aktif) üye bulunmakta.\n\`>\` Sunucumuzdaki sesli kanallarda toplam **${OnVoice}** üye bulunmakta.\n\`>\` Sunucumuzda **${Boost}** adet boost bulunmakta ve **${BoostLevel}.** seviye.`));

  }
}

