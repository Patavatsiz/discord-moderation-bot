const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  Event: "hrolal",
  Komut: ["herkestenrolal", "allremove", "removeroleall"],
  Kullanim: ".hrolal @rol/ID",
  Acıklama: "Herkesten Rol Alır",
  Kategori: "Owner",

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
    if (!message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: Bu komudu yalnızca \`ADMINISTRATOR\` yetkisine sahip kullanıcılar kullanabilir.")).sil(7);


    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) {
      message.channel.wsend(embed.setDescription(`Hata: bir rol belirtmelisin.`)).sil(6);
      return;
    }
    else {
      try {
        message.guild.members.cache.filter(x => !x.user.bot && !x.roles.cache.has(role)).array().forEach((member, i) => {
          setTimeout(async () => {
            member.roles.remove(role)
          }, i * 100);
        });
        message.react(lucy.emojiler.yes);
      } catch (err) {
        message.react(lucy.emojiler.no)
        console.log(err);
      }
    }
  }
}