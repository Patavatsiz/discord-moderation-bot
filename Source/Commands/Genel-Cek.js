const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
  Event: "çek",
  Komut: ["gel"],
  Kullanim: ".çek @user/ID",
  Acıklama: "Kullanıcıyı bulunduğunuz odaya çeker",
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
    let msg = await message.channel.send(embed.setDescription(`${member}, ${message.author} seni \`${message.member.voice.channel.name}\` adlı kanala çekmek istiyor. Kabul ediyor musun?`));
    await msg.react(lucy.emojiler.yes)
    await msg.react(lucy.emojiler.no)

    let collector = msg.createReactionCollector((reaction, user) => user.id == member.id, { max: 1, time: 30000, error: ['time'] });

    collector.on("collect", async(reaction, user) => {
      if(reaction.emoji.name == lucy.emojiler.yes) {
        member.voice.setChannel(message.member.voice.channel.id);
        await msg.edit(embed.setDescription(`${message.author}, ${member} çekme işlemini onayladı.`)).sil(5)
        message.react(lucy.emojiler.yes)
      } else if(reaction.emoji.name == lucy.emojiler.no) {
        await msg.edit(embed.setDescription(`${message.author}, ${member} çekme işlemini reddetti.`)).sil(5)
        message.react(lucy.emojiler.no)
      }
    })

  }
}