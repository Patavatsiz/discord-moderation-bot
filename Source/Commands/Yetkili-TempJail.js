const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "tempjail",
  Komut: ["sürelijail", "sürelicezalandır", "tjail"],
  Kullanim: ".tjail @user/ID <sure> [sebep]",
  Acıklama: "Kullanıcıyı belirttiğiniz sure kadar jaile atar.",
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
    if (![lucy.roller.jailYetkilileri].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription(`Hata: bu komudu kullanamazsın.`)).sil(7);
    let cezano = lucyDatabase.cezaNo() + 1;

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member || member.id == message.author.id || member.id == message.guild.ownerID || member.bot || member.roles.highest.position >= message.member.roles.highest.position) return message.channel.wsend(embed.setDescription(`Hata: Lütfen bir kullanıcı etiketleyin veya etiketlediğiniz kullanıcının gereksinimleri karşıladığından emin olun.`)).sil(7);

    let sure = args[1];
    if(!sure) return message.channel.wsend(embed.setDescription(`Hata: Bir süre belirtin.`)).sil(6);
    let surelog = sure.replace("d", " gün").replace("s", " saniye").replace("h", " saat").replace("m", " dakika").replace("w", " hafta");
  
    let sebep = args.splice(2).join(" ");
    var res 
    if(sebep) {res = sebep} else {res = "bulunamadı"};

    if (!member.roles.cache.has(lucy.roller.jailRolü)) {
      await member.roles.add(lucy.roller.jailRolü).catch();
      lucyDatabase.cezaEkle(member, message.author, "tempjail", cezano, sure, Date.now()+ms(sure), res);
      message.guild.log(lucyDatabase.cezaBilgi(cezano), member, message.author, "jail", "jail-log");
      message.channel.wsend(`${lucy.emojiler.yes} | ${member} kişisi **${res}** sebebiyle **${surelog}** boyunca cezalıya atıldı. \`(#${cezano})\``).sil(7);
      message.react(lucy.emojiler.yes)
      setTimeout(async () => {
        for (i = cezano; i > 0; i--) {
          await lucyDatabase.sJailKaldir(i)
        if (member.roles.cache.has(lucy.roller.jailRolü)) {
          await member.roles.remove(lucy.roller.jailRolü).catch();
          message.guild.unlog("jail-log", member, message.author, "unjail", cezano)
        break;
        } 
        }
      })
    } else {
      message.channel.wsend(embed.setDescription(`Hata: \`Aktif Ceza\` zaten bu kişinin aktif cezalandırması var.`)).sil(5);
      message.react(lucy.emojiler.no)
    }

  }
}