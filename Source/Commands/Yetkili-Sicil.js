const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
const table = require('table');
const moment = require('moment');
module.exports = {
  Event: "sicil",
  Komut: ["cezalar"],
  Kullanim: ".sicil @user/ID",
  Acıklama: "Kullanıcının sicilini",
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
   * @param {Array<String>} args
   * @returns {Promise<Void>} 
   */
  onRequest: async function (client, message, args) {

    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    if (![lucy.roller.enAltYetkiliRolü].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: Bu komudu kullanamazsın")).sil(7);

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.wsend(embed.setDescription(`Hata: bir kullanıcı belirtin.`)).sil(6);
    let data = await lucyDatabase.cezaGetir(uye) || [];
    if(lucyDatabase.cezaGetir(uye)) {
      let f = [["ID", "TUR", "SEBEP", "CEZA TARIHI", "🛑"]];
      f = f.concat(data.map(x => {
        return [
          `#${x.CezaNumarasi}`,
          `${x.CezaTuru}`,
          `${x.CezaSebebi}`,
          `${moment(x.CezaTarihi).locale("tr").format("LL")}`,
          `${lucyDatabase.cezaBilgi(x.CezaNumarasi).Aktiflik == true ? "✅" : "❌"}`
        ]
      }));
      let cezalar = `\`\`\`${table.table(f, {
        border: table.getBorderCharacters(`void`),
        columnDefault: {
          paddingLeft: 0,
          paddingRight: 2,
        },
        columns: {
          0: {
            paddingLeft: 1
          },
          1: {
            paddingLeft: 1
          },
          2: {
            paddingLeft: 1,
          },
          3: {
            paddingLeft: 1,
            paddingRight: 1,
          },
        },
        /**
        * @typedef {function} drawHorizontalLine
        * @param {number} index
        * @param {number} size
        * @return {boolean}
        */
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
        }
      })}\`\`\``

      message.channel.wsend(embed
        .setTitle(`:no_entry_sign: \`${uye.id}\` idli kullanıcının ceza bilgileri;`)
        .setFooter(`Tek bir cezaya bakmak için ${sistem.botPrefix}cezabilgi <cezaid>`)
        .setDescription(cezalar)).catch(() => {

        var attachment 
      attachment = new MessageAttachment(Buffer.from(cezalar), "sicil.txt")
          message.channel.wsend(`:no_entry_sign: \`${uye.id}\` idli kullanıcının ceza bilgileri karakter sınırını aştığından dolayı \`.txt\` formatında gönderildi.`, attachment)
        });
    } else {
      message.channel.wsend(embed.setDescription(`Kullanıcı daha önce ceza yememiş!`)).sil(7);
    }

  }
}