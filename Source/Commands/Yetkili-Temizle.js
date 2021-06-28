const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  Event: "sil",
  Komut: ["temizle"],
  Kullanim: ".sil",
  Acıklama: "Belirttiğiniz miktar kadar mesaj siler",
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
   * @param {Array<Sting>} args 
   */
  onRequest: function(client, message, args) {
    let embed = new MessageEmbed().setColor("RANDOM");
    if(![lucy.roller.enAltYetkiliRolü].some(x => message.guild.members.cache.get(x)) && !message.member.hasPermission(8) && !message.member.hasPermission("MANAGE_MESSAGES")) return;
 if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.wsend("Hata: 1-100 arasında silinecek mesaj miktarı belirtmelisin!").sil(7);
 message.delete().then(() => {
    message.channel.bulkDelete(Number(args[0])).then(x => message.channel.wsend(`${lucy.emojiler.yes} Başarıyla <#${message.channel.id}> (\`${message.channel.id}\`) adlı kanal da (**${x.size}**) adet mesaj silindi!`)).sil(7);})

  }
}

