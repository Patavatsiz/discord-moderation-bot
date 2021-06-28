const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "ekip",
  Komut: [""],
  Kullanim: ".ekip <ekle\sil\list> <ekiptagi> <ekiptagi(sayı)> <rolecolor> <rolperms> <rolename>",
  Acıklama: "Ekip eklersiniz.",
  Kategori: "Yetkili",

  /**
   * 
   * @param {CLient} client 
   */
  onLoad: function(client) {

  },

  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String|Number>} args 
   * @returns {Promise<void>}
   */
  onRequest: async function(client, message, args) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));
    if (!message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription(`Hata: bu komudu kullanamazsın.`)).sil(7);
  
    if(!args[0]) return message.channel.wsend(embed.setDescription(`Hata: lütfen komudu doğru kullan : .ekip ekle/sil/list <tag1> <tag2(sayı)> <rol rengi> <rol izinleri> <rol adı>`))
    if(args[0] && args[0].toLocaleLowerCase().includes("ekle" || "add")) {
    var tag1 = args[1];
    var tag2 = args[2]
    var rolcolor = args[3]
    var rolperm = Number(args[4])
    var rolname = args.splice(5).join(" ")

      if (!tag1 && !tag2 &&!rolcolor && !rolperm && !rolname) return message.channel.wsend(embed.setDescription(`Hata: Şunlardan birini belirtmeyi unuttun. Sırasıyla; tag1, tag2, rol rengi (RED/#01ff65), rol izinleri (8, 0 ...), rol adı`)).sil(15)
      let uyeler = message.guild.members.cache.filter(x => x.user.username.includes(tag1) || x.user.discriminator.includes(tag2)).size.toLocaleString();
      lucyDatabase.ekipEkle(rolname, rolcolor, rolperm, tag1, tag2);
      message.channel.wsend(embed.setDescription(`${message.author} \`${rolname}\` isimli ekibi ekledi, adında tag bulunduranlar rolü dagıtmaya basladım!.\n\n\`Ekip Tagı:\` **${tag1} (#${tag2})**\n\`Ekipteki Toplam Uye Sayısı:\` **${uyeler}**`)).sil(7);
      message.react(lucy.emojiler.yes)

    } else if(args[0] && args[0].toLocaleLowerCase().includes("list" || "liste")) {
      let ekips = lucyDatabase.ekipCek();
      let list = ekips.map(x => `${message.guild.roles.cache.get(x)} **bilgileri;**\n\`•\` Ekipte bulunan toplam üye sayısı: **${message.guild.members.cache.filter(s => s.roles.cache.has(x)).size}**\n\`•\` Ekipte bulunan toplam çevrimiçi üye sayısı: **${message.guild.members.cache.filter(s => s.roles.cache.has(x) && s.presence.status !== "offline").size}**\n \`•\` Ekipte bulunan toplam sesteki üye sayısı: **${message.guild.members.cache.filter(s => s.roles.cache.has(x) && s.voice.channel).size}**`).slice(0, 15).join("\n\n")
      message.channel.wsend(embed.setThumbnail(message.guild.iconURL({dynamic: true})).setDescription(`${message.guild.name} Sunucusuna ait ekip bilgileri aşşağıda sıralanmıştır;\n\n${list || "Bulunamadı"}`))
    } else if(args[0] && args[0].toLocaleLowerCase().includes("sil" || "delete")) {
      var ekiprol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
      if(!ekiprol) return message.channel.wsend(embed.setDescription(`Hata: Lütfen bir ekip rolü belirtip tekrar deneyin.`)).sil(10);
      lucyDatabase.ekipSil(ekiprol)
      message.react(lucy.emojiler.yes);
    }
    
    
  
  
  }
}
