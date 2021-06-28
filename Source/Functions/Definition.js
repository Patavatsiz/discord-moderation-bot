const { Collection, MessageEmbed } = require('discord.js');
const fs = require('fs')
client.commands = new Collection();
client.aliases = new Collection();
const moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
const event = require('./Events');
class bakaLucy {

  static commandsOn() {
    fs.readdirSync("./Source/Commands", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`../Commands/${files}`);
    if(!command.Event) return console.log("\x1b[31m%s\x1b[0m", `[ Hatalı Dosya ] ../Commands/${files}`)
    if(typeof command.onLoad === "function") command.onLoad(global.client);
    client.commands.set(command.Event, command)
    if(command.Komut) {
      command.Komut.forEach(alias => client.aliases.set(alias, command))
    }
    });
  }

  static systemOn() {
    const sistem = global.sistem = require('../Settings/botSystem');
    const lucy = global.lucy = require('../Settings/extands.json');
    const tarihhesapla = global.tarihHesapla = (date) => {
            const startedAt = Date.parse(date);
            var msecs = Math.abs(new Date() - startedAt);
          
            const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
            msecs -= years * 1000 * 60 * 60 * 24 * 365;
            const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
            msecs -= months * 1000 * 60 * 60 * 24 * 30;
            const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
            msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
            const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
            msecs -= days * 1000 * 60 * 60 * 24;
            const hours = Math.floor(msecs / (1000 * 60 * 60));
            msecs -= hours * 1000 * 60 * 60;
            const mins = Math.floor((msecs / (1000 * 60)));
            msecs -= mins * 1000 * 60;
            const secs = Math.floor(msecs / 1000);
            msecs -= secs * 1000;
          
            var string = "";
            if (years > 0) string += `${years} yıl`
            else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
            else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
            else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
            else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
            else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
            else if (secs > 0) string += `${secs} saniye`
            else string += `saniyeler`;
          
            string = string.trim();
            return `\`${string} önce\``;
          };

            let aylartoplam = {
            "01": "Ocak",
            "02": "Şubat",
            "03": "Mart",
            "04": "Nisan",
            "05": "Mayıs",
            "06": "Haziran",
            "07": "Temmuz",
            "08": "Ağustos",
            "09": "Eylül",
            "10": "Ekim",
            "11": "Kasım",
            "12": "Aralık"
          };
          global.aylar = aylartoplam;
          const tarihsel = global.tarihsel = function(tarih) {
          let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
          return tarihci;
          };

  }

      static readyOn() {
        global.client.on('ready', () => {
          client.user.setPresence({ activity: { name: sistem.ActivityName, type: sistem.ActivityType }, status: sistem.Status });
          client.channels.cache.get(sistem.VoiceChannel).join().catch();
        });
        var x = require('../Settings/botSystem')
        global.client.login(x.botToken)
        .then(x => console.log("\x1b[34m%s\x1b[1m", "[ Lucy Moderation ] Discord API Botun tokenini doğruladı!"))
        .catch(err => console.error("\x1b[31m%s\x1b[0m", "[ Lucy Moderation ] Discord API Botun tokenini doğrulayamadı."))
        
      }

      static activateModeration() {
        console.log("\x1b[33m%s\x1b[0m", "[ Lucy Moderation ] Çalıştırıldı!")
        event.fetchEvent("../Events/lucyHandlers")
        event.fetchEvent("../Events/guildMembersScanner")
      }


      static messageLog() {
  client.on("messageDelete", async (message, channel) => {
          if(message.webhookID || message.author.bot || message.channel.type === "dm") return;
            if (message.author.bot) return;
            let silinenMesaj = message.guild.channels.cache.find(x => x.id === lucy.kanallar.messageLogChannel)
            const embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Mesaj silindi.`, message.author.avatarURL())
            .addField("Kullanıcı Tag", message.author.tag, true)
            .addField("Kanal Adı", message.channel.name, true)
            .addField("Silinen Mesaj", "```" + message.content + "```")
            .setThumbnail(message.author.avatarURL())
            silinenMesaj.send(embed);
            
          });
          client.on("messageUpdate", async (oldMessage, newMessage) => {
          if(newMessage.webhookID || newMessage.author.bot || newMessage.channel.type === "dm") return;
            let guncellenenMesaj = newMessage.guild.channels.cache.find(x => x.id === lucy.kanallar.messageLogChannel)
            if (oldMessage.content == newMessage.content) return;
            let embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL())
            .addField("Kullanıcı", newMessage.author)
            .addField("Eski Mesaj", oldMessage.content, true)
            .addField("Yeni Mesaj", newMessage.content, true)
            .addField("Kanal Adı", newMessage.channel.name, true)
            .setThumbnail(newMessage.author.avatarURL())
           guncellenenMesaj.send(embed)
            
          });
      }

};

module.exports = bakaLucy
