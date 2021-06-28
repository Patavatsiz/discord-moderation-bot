const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "jail",
  Komut: ["ceza", "cezalandır"],
  Kullanim: ".jail @user/ID [sebep]",
  Acıklama: "Kullanıcıyı cezalıya atar!",
  Kategori: "Yetkili",
  /**
   * 
   * @param {Client} client 
   */
  onLoad: function(client){

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
    if(![lucy.roller.jailYetkilileri].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription(`Hata: bu komudu kullanamazsın.`)).sil(7);
    let cezano = lucyDatabase.cezaNo() + 1;

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member || member.id == message.author.id || member.id == message.guild.ownerID || member.bot || member.roles.highest.position >= message.member.roles.highest.position) return message.channel.wsend(embed.setDescription(`Hata: Lütfen bir kullanıcı etiketleyin veya etiketlediğiniz kullanıcının gereksinimleri karşıladığından emin olun.`)).sil(7);

    var sebep = args.splice(1).join(" ");
    var res
    if(sebep) res = sebep;
    if(!sebep) res = "bulunamadı";

    if(!member.roles.cache.has(lucy.roller.jailRolü)) {
    await member.roles.add(lucy.roller.jailRolü).catch();
    lucyDatabase.cezaEkle(member, message.author, "jail", cezano, "Yok", "Yok", res);
    message.guild.log(lucyDatabase.cezaBilgi(cezano), member, message.author, "jail", "jail-log");
      message.channel.wsend(`${lucy.emojiler.yes} | ${member} kişisi **${res}** sebebiyle cezalıya atıldı. \`(#${cezano})\``).sil(7);
    message.react(lucy.emojiler.yes)
    } else {
      message.channel.wsend(embed.setDescription(`Hata: \`Aktif Ceza\` zaten bu kişinin aktif cezalandırması var.`)).sil(5);
      message.react(lucy.emojiler.no)
    }

  }
}