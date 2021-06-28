const { Client, Message, MessageEmbed } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
module.exports = {
    Event: "yasaktag",
    Komut: [""],
    Kullanim: ".yasaktag <add/remove/list> <tag>",
    Acıklama: "Yasaktag Ekler/Siler/Listeler",
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
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name, message.guild.iconURL({dynamic: true}));
        if(!message.member.hasPermission(8)) return message.channel.wsend(embed.setDescription("Hata: Bu komudu yalnızca \`ADMINISTRATOR\` yetkisine sahip kullanıcılar kullanabilir.")).sil(7);
        if(!args[0]) return message.channel.wsend(embed.setDescription(`Hata: Bir eylem belirtin. (add/remove/list)`)).sil(6);
        if(args[0] && args[0].toLocaleLowerCase().includes("add" || "ekle")) {
            var tag = args.splice(1).join(" ");
            if(!tag) return message.channel.wsend(embed.setDescription("Hata: Bir tag belirtin.")).sil(5);
            lucyDatabase.yasakTagEkle(tag)
            message.react(lucy.emojiler.yes);
            message.channel.wsend(embed.setDescription(`\`${tag}\` tagı başarıyla yasaklı tag olarak belirlendi.`)).sil(5);
        } else if (args[0] && args[0].toLocaleLowerCase().includes("remove" || "kaldır" || "sil")) {
            var tag = args.splice(1).join(" ");
            lucyDatabase.yasakTagKaldır(tag);
            message.react(lucy.emojiler.yes);
            message.channel.wsend(embed.setDescription(`\`${tag}\` tagı başarıyla yasaklı taglardan kaldırıldı.`)).sil(5);
        } else if (args[0] && args[0].toLocaleLowerCase().includes("list" || "liste")) {
            let data = lucyDatabase.yasakTagGetir('yasakTaglar');
            let print = data.map((x, i) => `\`${i + 1}.\` **Tag:** \`${x}\``).slice(0, 20).join("\n");
            message.channel.wsend(`\`${message.guild.name}\` sunucusuna ait **yasaklı taglar** listesi;\n${print}`);
        }
    }
}