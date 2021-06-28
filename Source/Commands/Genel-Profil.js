const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "profil",
  Komut: ["profile", "kullanıcıbilgi", "kb"],
  Kullanim: ".profil",
  Acıklama: "Kullanıcı profili",
  Kategori: "Genel",

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
    
    var user = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;

    let uye = message.guild.member(user);

    var yt = ``;
    if(uye.bot) return message.channel.wsend(embed.setDescription(`Hata: botların profiline bakamazsın`)).sil(5);

    var platform = {
      web: "Tarayıcı",
      desktop: "PC (App)",
      mobile: "Mobil"
    };

    var bilgi;

    if (uye.user.presence.status !== "offline") {
      bilgi = `\`Kullanıcı:\` ${uye}\n\`Etiket:\` **#${uye.user.discriminator}**\n\`Bağlandığı Cihaz:\` **${platform[Object.keys(uye.user.presence.clientStatus)[0]]}**\n\`Hesap Acılıs Tarihi:\` **${moment(uye.user.createdAt).locale("tr").format("LLL")}**\n\`Sunucuya Katılma Tarihi:\` **${moment(uye.joinedAt).locale("tr").format("LLL")}**\n\`Katılım Sıralaması:\` **${(message.guild.members.cache.filter(x => x.joinedAt < uye.joinedAt).size).toLocaleString()}**\n\`Rolleri:\` ${uye.roles.cache.size <= 5 ? uye.roles.cache.filter(x => x.name !== '@everyone').map(x => x).join(", ") : `Listelenemedi (${uye.roles.cache.size} adet)`}`
    } else {
      bilgi = `\`Kullanıcı:\` ${uye}\n\`Etiket:\` **#${uye.user.discriminator}**\n\`Bağlandığı Cihaz:\` **Offline**\n\`Hesap Acılıs Tarihi:\` **${moment(uye.user.createdAt).locale("tr").format("LLL")}**\n\`Sunucuya Katılma Tarihi:\` **${moment(uye.joinedAt).locale("tr").format("LLL")}**\n\`Katılım Sıralaması:\` **${(message.guild.members.cache.filter(x => x.joinedAt < uye.joinedAt).size).toLocaleString()}**\n\`Rolleri:\` ${uye.roles.cache.size <= 5 ? uye.roles.cache.filter(x => x.name !== '@everyone').map(x => x).join(", ") : `Listelenemedi (${uye.roles.cache.size} adet)`}`
    }
    embed.addField(`__**Kullanıcı Bilgisi**__`, bilgi)

    if(uye.roles.highest.position >= message.guild.roles.cache.get(lucy.roller.enAltYetkiliRolü).position) {
    let ban =  lucyDatabase.kb(uye, "ban")
     let jail =  lucyDatabase.kb(uye, "jail")
      let tempjail = lucyDatabase.kb(uye, "tempjail")
       let mute = lucyDatabase.kb(uye, "mute")
        let vmute = lucyDatabase.kb(uye, "vmute")
         let warn = lucyDatabase.kb(uye, "warn")
    var count = ban + jail + tempjail + mute + vmute + warn;
      yt += `Toplam **${count}** adet yetkili komudu kullanmış.\`(${ban} ban | ${jail} jail | ${tempjail} tempjail | ${mute} mute | ${vmute} voice mute | ${warn} warning)\``;
      embed.addField(`__**Yetki Kullanım Bilgisi**__`, yt)
    }

    message.channel.wsend(embed)
  }
}