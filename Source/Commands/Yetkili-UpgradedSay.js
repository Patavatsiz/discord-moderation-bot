const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  Event: "gsay",
  Komut: ["gelişmiş-say"],
  Kullanim: ".gsay",
  Acıklama: "Yetkililerin kullanabileceği gelişmiş say komutudur.",
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
   * @param {Array<Sting>} args 
   */
onRequest: function(client, message, args) {

if(![lucy.roller.enAltYetkiliRolü].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("ADMINISTRATOR")) return;
var Guild = message.guild.memberCount;
var Online = message.guild.members.cache.filter(x => x.presence.status != "offline").size.toString();
var Bot = message.guild.members.cache.filter(x => x.user.bot).size.toString();
var Boost = message.guild.premiumSubscriptionCount;
var BoostLevel = message.guild.premiumTier;
var Tagges = message.guild.members.cache.filter(x => !x.user.bot && x.user.username.includes(lucy.serverTag) || "0" && x.user.username.includes(lucy.serverTag2) || "0").size.toString();
  var Yetkili = message.guild.members.cache.filter(x => !x.user.bot && x.roles.highest.position >= message.guild.roles.cache.get(lucy.roller.enAltYetkiliRolü).position).size.toString();
var Sesli = message.guild.members.cache.filter(x => x.voice.channel).size.toString();
  var Kayıtlı = message.guild.members.cache.filter(x => !x.user.bot && !x.roles.cache.has(lucy.roller.kayıtsızRolü) && !x.roles.cache.has(lucy.roller.şüpheliRolü) && !x.roles.cache.has(lucy.roller.yasaklıTagRolü)).size.toString();
  var Kayıtsız = message.guild.members.cache.filter(x => !x.user.bot && x.roles.cache.has(lucy.roller.kayıtsızRolü) || x.roles.cache.has(lucy.roller.şüpheliRolü)).size.toString();
  var YasakTaglı = message.guild.members.cache.filter(x => !x.user.bot && x.roles.cache.has(lucy.roller.yasaklıTagRolü)).size.toString();
  var Cezalı = message.guild.members.cache.filter(x => !x.user.bot && x.roles.cache.has(lucy.roller.jailRolü)).size.toString();
  var Muteli = message.guild.members.cache.filter(x => !x.user.bot && x.roles.cache.has(lucy.roller.muteRolü) && x.roles.cache.has(lucy.roller.vmuteRolü)).size.toString();

let embed = new MessageEmbed().setColor("RANDOM");
message.channel.wsend(embed.setDescription(`
\`>\` Sunucumuzda toplam **${Guild}** (**${Online}** Aktif, **${Bot}** Bot) adet kullanıcı var.
\`>\` Tagımızı alan toplam **${Tagges}** üye var.
\`>\` Sesli kanallarda toplam **${Sesli}** üye var.

\`>\` Sunucumuza toplam **${Boost}** boost basılmış ve **${BoostLevel}.** seviye.
\`>\` Sunucumuzda toplam **${Yetkili}** yetkili var.
\`>\` Sunucumuzdaki kullanıcıların toplam **${Kayıtlı}** adedi kayıtlı, **${Kayıtsız}** adedi kayıtsız.

\`>\` Sunucumuzda toplam **${YasakTaglı}** yasak taglı kullanıcı var.
\`>\` Sunucumuzda toplam **${Cezalı}** üye cezalıda.
\`>\` Sunucumuzda toplam **${Muteli}** muteli üye var.`))


  }
}
