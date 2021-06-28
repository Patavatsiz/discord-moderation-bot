const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "ban",
  Komut: ["yargı", "yasakla"],
  Kullanim: ".ban @user/ID [sebep]",
  Acıklama: "Kullanıcıyı sunucudan yasaklar",
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

    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic:true}));
    if(![lucy.roller.banYetkilileri].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: bu komudu kullanamazsın.")).sil(5);
    let cezano = lucyDatabase.cezaNo() + 1;
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member || member.id == message.author.id || member.id == message.guild.ownerID || member.bot || member.roles.highest.position >= message.member.roles.highest.position) return message.channel.wsend(embed.setDescription(`Hata: Lütfen bir kullanıcı etiketleyin veya etiketlediğiniz kullanıcının gereksinimleri karşıladığından emin olun.`)).sil(7);
    let res = args.splice(1).join(" ")
    var sebep
    if(!res) sebep = "Bulunamadı"
    if(res) sebep = res
    
    lucyDatabase.cezaEkle(member, message.author, "ban", cezano, "Sınırsız", "Yok", sebep);
    message.guild.members.ban(member.id, { reason: "Yasaklayan: " + message.author.id + " Sebep: " + sebep });
    message.guild.log(lucyDatabase.cezaBilgi(cezano), member, message.author, "ban", "ban-log");
    message.channel.wsend(`${lucy.emojiler.yes} | ${member} adlı kullanıcının sunucuya erişimi başarıyla yasaklandı. \`(#${cezano})\``).sil(7)
    message.react(lucy.emojiler.yes)

  }
}