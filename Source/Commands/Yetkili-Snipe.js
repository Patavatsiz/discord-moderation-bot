const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { JsonDatabase } = require('wio.db');
const sdb = new JsonDatabase({ databasePath: './Source/Databases/Snipe.json' });
const fs = require('fs');
module.exports = {
  Event: "snipe",
  Komut: [""],
  Kullanim: ".snipe",
  Acıklama: "En son silinen mesajları gösterir.",
  Kategori: "Yetkili",

  /**
   * 
   * @param {Client} client 
   */
  onLoad: function (client) {

    client.on("messageDelete", async message => {
      if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
      await sdb.push(`snipes.${message.guild.id}.${message.channel.id}`, {
        Author: message.author.id,
        Content: message.content
      });
    });
  },

  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<Sting>} args 
   * @returns {Promise<void>}
   */
  onRequest: async function (client, message, args) {
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));
    if (![lucy.roller.enAltYetkiliRolü].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: Bu komudu yalnızca kullanamazsın.")).sil(7);

     let snipex = await sdb.get(`snipes.${lucy.sunucuID}.${message.channel.id}`)
     let snipey = await sdb.get(`snipe.${lucy.sunucuID}`)
     var sayi = Number(args[0]) || isNaN(args[0]);
     if(sayi.length > 50 || sayi.length < 1) return message.channel.wsend(embed.setDescription(`Belirttiğin sayı 1-50 arasında olmalı.`)).sil(7);

     if(!snipex) {
       message.channel.wsend(embed.setDescription(`Datada silinmiş mesaj bulunamadı!`)).sil(7);
     } 
     else {
       var print = snipex.map((x, i) => `\`${i + 1}.\` **Message Author:** \`\`${x.Author}\`\` \`<|>\` **Message Content:** \`\`\`${x.Content}\`\`\` `).slice(0, sayi);
       message.channel.wsend(embed.setDescription(print))
       .catch(x => {
         var printother = snipex.map((x, i) => `\`${i + 1}.\` **Message Author:** \`\`${x.Author}\`\` \`<|>\` **Message Content:** \`\`\`${x.Content}\`\`\` `).slice(0, sayi);
         var file = './snipe.txt';
         var con = '\u200B';
         if(!snipey) {
           fs.writeFileSync(file, con)
            sdb.set(`snipe.${lucy.sunucuID}.${message.channel.id}`, "snipe")
         };

         const cs = fs.readFileSync('snipe.txt', 'utf-8');
         fs.writeFileSync('snipe.txt', printother + cs);
         const fx = fs.readFileSync('snipe.txt');
         var attachment = new MessageAttachment(fx, 'snipe.txt');
         message.channel.wsend(`Mesaj karakter sınırını geçtiğinden \`.txt\` formatında gönderildi`, attachment);
         setTimeout(() => {
           fs.unlinkSync('snipe.txt')
           sdb.delete(`snipe.${lucy.sunucuID}.${message.channel.id}`)
         }, 100);
       })
     }
  }
}

