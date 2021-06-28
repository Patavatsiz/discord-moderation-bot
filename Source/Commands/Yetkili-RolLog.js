const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
const moment = require('moment');
module.exports = {
    Event: "rol",
    Komut: ["role"],
    Kullanim: ".rol <ver/al/log> @user/ID @rol/ID",
    Acıklama: "Kullanıcıdan rol verirsiniz/alırsınız veya kullanıcının rol loguna bakarsınız.",
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
     */
    onRequest: function (client, message, args) {
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic: true}));
        if (![lucy.roller.rolVermeYetkilisi].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission("MANAGE_ROLES")) return message.channel.wsend(embed.setDescription("Hata: Bu komudu kullanamazsın")).sil(7);

      let islem = args[0];
      if(!islem || islem != 'ver' && islem != 'al' && islem != 'log') return message.channel.wsend(embed.setDescription(`Hata: Lütfen geçerli bir işlem belirtin: <ver/al/log>`)).sil(7);


      let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
      if (!member || member.id == message.author.id || member.id == message.guild.ownerID || member.bot || member.roles.highest.position >= message.member.roles.highest.position) return message.channel.wsend(embed.setDescription(`Hata: Lütfen bir kullanıcı etiketleyin veya etiketlediğiniz kullanıcının gereksinimleri karşıladığından emin olun.`)).sil(7);

      if (islem && member && islem == 'log') {
        let data = lucyDatabase.rolCek(member)
        data = data.reverse();
        let nums = data.length || 0
        let print = nums > 0 ? data.map(x => `${x.Push}`).slice(0, 15).join("\n") : "Rol Bilgisi Bulunamadı!";
        message.channel.wsend(embed.setDescription(`${member} (${member.roles.highest}) kişisinin toplamda ${nums} rol bilgisi bulundu ve son 15 rol bilgisi aşağıda sıralandı;\n\n${print}`))
      }

      let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);

      if(islem && member && rol && islem == 'ver' && !member.roles.cache.has(rol)) {
        lucyDatabase.roleAdd(member, rol, moment(Date.now()).locale("tr").format("LLL"), message.author)
        message.react(lucy.emojiler.yes)
        member.roles.add(rol)
      } 

      if (islem && member && rol && islem == 'al') {
        lucyDatabase.roleRemove(member, rol, moment(Date.now()).locale("tr").format("LLL"), message.author, )
        message.react(lucy.emojiler.yes)
        member.roles.remove(rol)
      }



    }
}