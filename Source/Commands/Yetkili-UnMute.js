const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
  Event: "unmute",
  Komut: ["mutekaldır"],
  Kullanim: ".unmute @user/ID",
  Acıklama: "Kullanıcının mutesini kaldırır.",
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
    if (![lucy.roller.muteYetkilileri].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription(`Hata: bu komudu kullanamazsın.`)).sil(7);
    let cezano = lucyDatabase.cezaNo() + 1;

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member || member.id == message.author.id || member.id == message.guild.ownerID || member.bot || member.roles.highest.position >= message.member.roles.highest.position || !member.roles.cache.has(lucy.roller.muteRolü) && !member.roles.cache.has(lucy.roller.vmuteRolü)) return message.channel.wsend(embed.setDescription(`Hata: Lütfen bir kullanıcı etiketleyin veya etiketlediğiniz kullanıcının gereksinimleri karşıladığından emin olun.`)).sil(7);

    if(member.roles.cache.has(lucy.roller.muteRolü)) {
      for (i = cezano; i > 0; i--) {
      await lucyDatabase.mutelerKaldir(i)
      await member.roles.remove(lucy.roller.muteRolü).catch();
      await message.react(lucy.emojiler.yes);
      message.guild.unlog("mute-log", member, message.author, "unmute", cezano)
      break;
      }
      return;
    } else if (member.roles.cache.has(lucy.roller.vmuteRolü)) {
      for (i = cezano; i > 0; i--) {
      await lucyDatabase.vMuteKaldir(i);
      await member.roles.remove(lucy.roller.vmuteRolü).catch();
      await member.voice.setMute(false)
      await message.react(lucy.emojiler.yes);
      message.guild.unlog("mute-log", member, message.author, "unvmute", cezano)
        break;
      }
      return;
    } else {
      message.channel.wsend(embed.setDescription(`Hata: \`Rol Bulunmuyor\` Kullanıcıda mute rolü zaten bulunmuyor!`)).sil(7);
      await message.react(lucy.emojiler.no);
    }


  } 
}