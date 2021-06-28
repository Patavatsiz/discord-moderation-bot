const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  Event: "git",
  Komut: [""],
  Kullanim: ".git @user/ID",
  Acıklama: "Etiketlediğiniz odaya gidersiniz",
  Kategori: "Genel",

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
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic: true}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.wsend(embed.setDescription(`Lütfen bir kullanıcı belirtin.`)).sil(10);
    if(!message.member.voice.channel && !member.voice.channel) return message.channel.wsend(embed.setDescription(`Siz veya etiketlediğiniz kullanıcı bir sesli kanalda bulunmamakta.`))
    let msg = await message.channel.send(embed.setDescription(`${member}, ${message.author} \`${member.voice.channel.name}\` adlı kanala gelmek istiyor. Kabul ediyor musun?`));
    await msg.react(lucy.emojiler.yes)
    await msg.react(lucy.emojiler.no)

    let collector = msg.createReactionCollector((reaction, user) => user.id == member.id, { max: 1, time: 30000, error: ['time'] });

    collector.on("collect", async(reaction, user) => {
      if(reaction.emoji.name == lucy.emojiler.yes) {
        message.member.voice.setChannel(member.voice.channel.id);
        await msg.edit(embed.setDescription(`${message.author}, ${member} odaya gelmeni onayladı.`)).sil(5)
        message.react(lucy.emojiler.yes)
      } else if(reaction.emoji.name == lucy.emojiler.no) {
        await msg.edit(embed.setDescription(`${message.author}, ${member} odaya gelmeni reddetti.`)).sil(5)
        message.react(lucy.emojiler.no)
      }
    })

  }
}