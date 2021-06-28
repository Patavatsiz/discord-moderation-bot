const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "mute",
  Komut: ["chatmute", "sustur"],
  Kullanim: ".mute @user/ID <sure> [sebep]",
  Acıklama: "Kullanıcıyı metin kanallarında susturur",
  Kategori: "Yetkili",

  /**
   * 
   * @param {Client} client 
   */
  onLoad: function(client) {

  },

  /**
   * 
   * @param {CLient} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @returns {Promise<void>}
   */
  onRequest: async function(client, message, args) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic: true}));
    if(![lucy.roller.muteYetkilileri].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription(`Hata: bu komudu kullanamazsın.`)).sil(7);
    let cezano = lucyDatabase.cezaNo() + 1;
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member || member.id == message.author.id || member.id == message.guild.ownerID || member.bot || member.roles.highest.position >= message.member.roles.highest.position) return message.channel.wsend(embed.setDescription(`Hata: Lütfen bir kullanıcı etiketleyin veya etiketlediğiniz kullanıcının gereksinimleri karşıladığından emin olun.`)).sil(7);

    var sure = args[1];
    if(!sure) return message.channel.wsend(embed.setDescription(`Hata: bir süre belirtmeyi unuttun.`)).sil(7);
    var logsure = sure.replace("s", " saniye").replace("d", " gün").replace("h", " saat").replace("m", " dakika").replace("w", " hafta");

    var sebep = args.splice(2).join(" ");
    var res 
    if(sebep) res = sebep;
    if(!sebep) res = "bulunamadı";

    if(!member.roles.cache.has(lucy.roller.muteRolü)) {
      lucyDatabase.cezaEkle(member, message.author, "mute", cezano, logsure, Date.now()+ms(sure), res);
      message.guild.log(lucyDatabase.cezaBilgi(cezano), member, message.author, "mute", "mute-bilgi");
      member.roles.add(lucy.roller.muteRolü).catch();
      message.channel.wsend(`${lucy.emojiler.yes} | ${member} kişisi **${res}** sebebiyle **${logsure}** boyunca metin kanallarında susturuldu. \`(#${cezano})\``).sil(7);
      message.react(lucy.emojiler.yes)

      setTimeout(async () => {
        for (i = cezano; i > 0; i--) {
        await lucyDatabase.MuteKaldir(i);
        member.roles.remove(lucy.roller.muteRolü).catch();
        message.guild.unlog("mute-bilgi", member, message.author, "unmute", cezano)
        break;
        }
      }, ms(sure))
    } else {
      message.channel.wsend(embed.setDescription(`Hata: \`Aktif Ceza\` zaten bu kişinin aktif cezalandırması var.`)).sil(5);
     message.react(lucy.emojiler.no)
    }
  }
}