const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
    Event: "disconnect",
    Komut: ["kes"],
    Kullanim: ".kes @user/ID",
    Acıklama: "Kullanıcıyı sesli kanaldan çıkarır.",
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
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic: true}));
        if (![lucy.roller.enAltYetkiliRolü].some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: Bu komudu kullanamazsın")).sil(7);

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user || user.id == message.author.id || user.roles.highest.position >= message.member.roles.highest.position || !user.voice.channel) return message.channel.wsend(embed.setDescription("Hata: Belirttiğiniz kullanıcı bir sesli kanalda değil veya bir kullanıcı belirtmedin veya belirttiğin kullanıcı kriterlere uymuyor.")).sil(7);
        if(user && user.voice.channel) {
            user.voice.kick();
            message.react(lucy.emojiler.yes);

        } else return false

    }
}