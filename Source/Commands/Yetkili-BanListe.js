const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
const table = require('table');
module.exports = {
  Event: "banlist",
  Komut: ["banlistesi"],
  Kullanim: ".banlist",
  Acıklama: "Banlanan kullanıcıları gösterir.",
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
   * @returns {Promise<void>}
   */
  onRequest: async function (client, message, args) {

    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));
    if (![lucy.roller.banYetkilileri].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: bu komudu kullanamazsın.")).sil(5);
    
      try {
        let f = [["KULLANICI ADI", "KULLANICI ETIKETI", "KULLANICI ID"]]
        message.guild.fetchBans().then(x => {
          var arr = [];
          x.map(f => arr.push({ID: `${f.user.id}`, AD: `${f.user.username}`, TAG:`${f.user.discriminator}`}))
          f = f.concat(arr.map(xx => {
            return [
              `${xx.AD}`,
              `${xx.TAG}`,
              `${xx.ID}`
            ]
          }))
          message.channel.wsend(embed
          .setTitle(`:no_entry_sign: ${message.guild.name} Sunucusunun yasaklı kullanıcıları;`)
          .setDescription(`\`\`\`${table.table(f, {
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
            })}\`\`\``))
        })
      } catch(err) {
        console.log(err)
      }

  }
}




