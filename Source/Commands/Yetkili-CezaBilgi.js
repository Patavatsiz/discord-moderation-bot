const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
const func = require('../Functions/Function');
const moment = require('moment');
module.exports = {
  Event: "cezabilgi",
  Komut: ["cb", "cezaid", "cezaidbak"],
  Kullanim: ".cezabilgi <cezaID>",
  Acıklama: "Belirli bir ceza idsinin bilgilerini gösterir.",
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
   * @returns {Promise<Void>} 
   */
  onRequest: async function(client, message, args) {

    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    if (![lucy.roller.enAltYetkiliRolü].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: Bu komudu kullanamazsın")).sil(7);

    if(!args[0]) return message.channel.wsend(embed.setDescription(`Bir Ceza ID girin.`)).sil(5);

    let data = lucyDatabase.cezaBilgi(args[0]);

    if(!data) { message.channel.wsend(embed.setDescription(`**#${args[0]}** ID'li bir ceza bulunamadı`)).sil(7);
  return;} 
  else {
      let uye = await func.users(data.Uye);
      let yetkili = await func.users(data.Yetkili);
      if(!uye) uye = "-";
      if(!yetkili) yetkili = "-";
      let bzaman = data.CezaBitisTarihi
      var durum 
      let aktiflik = data.Aktiflik == true ? `${lucy.emojiler.yes} Aktif` : `${lucy.emojiler.no} Aktif Değil`;
      if(isNaN(bzaman)) {
        durum = aktiflik
      } else {
        durum = aktiflik
      }
      var kbilgi = `» Üye Bilgisi: ${uye} (\`${uye.id}\`)\n» Yetkili Bilgisi: ${yetkili} (\`${yetkili.id}\`)`;
      var cbilgi = `» Ceza Numarası : \`#${data.CezaNumarasi}\`\n» Ceza Türü: \`${data.CezaTuru}\`\n» Ceza Sebebi: \`${data.CezaSebebi}\`\n» Ceza Durumu: ${durum}\n» Ceza Tarihi: \`${moment(data.CezaTarihi).locale("tr").format("LLL")}\`\n» Ceza Süresi: \`${data.CezaSuresi}\``
      message.channel.wsend(embed.addField(`__**Kullanıcı ve Yetkili Bilgisi**__`, kbilgi).addField(`__**Ceza Bilgisi**__`, cbilgi))
    }

  }
}