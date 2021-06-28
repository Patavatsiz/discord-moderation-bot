const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
    Event: "nerede",
    Komut: ["n"],
    Kullanim: ".n @user/ID",
    Acıklama: "Kullanıcının hangi sesli kanalda olduğunu gösterir.",
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
        if (![lucy.roller.enAltYetkiliRolü].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: Bu komudu kullanamazsın")).sil(7);

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user || !user.voice.channel) return message.channel.wsend(embed.setDescription("Hata: Etiketlediğiniz kullanıcı bir sesli kanalda değil veya kullanıcı belirtmediniz!")).sil(8);
        if (user && user.voice.channel) {
            message.channel.wsend(embed.setDescription(`${user} adlı kullanıcı \`${user.voice.channel.name}\` isimli sesli kanalda.`)).sil(7);
            message.react(lucy.emojiler.yes);
        }

    }
}