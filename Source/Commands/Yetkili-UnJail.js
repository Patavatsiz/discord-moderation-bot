const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "unjail",
  Komut: ["cezakaldır", "jailkaldır"],
  Kullanim: ".unjail @user/ID",
  Acıklama: "Kullanıcıyı jailden çıkarır.",
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
    if (!member || member.id == message.author.id || member.id == message.guild.ownerID || member.bot || member.roles.highest.position >= message.member.roles.highest.position || !member.roles.cache.has(lucy.roller.jailRolü)) return message.channel.wsend(embed.setDescription(`Hata: Lütfen bir kullanıcı etiketleyin veya etiketlediğiniz kullanıcının gereksinimleri karşıladığından emin olun.`)).sil(7);

    if(member.roles.cache.has(lucy.roller.jailRolü)) {
      for (i = cezano; i > 0; i--) {
      await lucyDatabase.sJailKaldir(i)
      await member.roles.remove(lucy.roller.jailRolü).catch();
      await message.react(lucy.emojiler.yes);
      message.guild.unlog("jail-log", member, message.author, "unjail", cezano)
      break;
      }
      return;
    } else {
      message.channel.wsend(embed.setDescription(`Hata: \`Rol Bulunmuyor\` Kullanıcıda jail rolü zaten bulunmuyor!`)).sil(7);
      await message.react(lucy.emojiler.no);
    }
  }
}