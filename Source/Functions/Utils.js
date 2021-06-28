const { Guild, GuildMember, TextChannel, MessageEmbed } = require('discord.js');
const Webhooklar = {};

/**
 * 
 * @param {String} ID 
 * @returns {GuildMember}
 */
Guild.prototype.fetchMember = async function(ID) {
  let member = this.member(ID);
  if(!member) {
    try {
      member = await this.members.fetch(ID)
    }
    catch(err) {
      member = undefined
    }
  }
  return member;
};

GuildMember.prototype.rolTanımla = function (rolidler = []) {
    let rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler);
    return this.roles.set(rol);
}


Guild.prototype.findChannel = function(channel) {
  let chnnel = this.channels.cache.find(ch => ch.name === channel)
  return chnnel
};


Promise.prototype.sil = function(time) {
if(this) this.then(f => {
  if(f.deletable) f.delete({timeout: time * 1000});
});
};


TextChannel.prototype.wsend = async function (content, options) {
    if (Webhooklar[this.id]) return (await Webhooklar[this.id].send(content, options));
    let entegrasyonlar = await this.fetchWebhooks();
    let webh = entegrasyonlar.find(e => e.name == client.user.username),
        result;
    if (!webh) {
        webh = await this.createWebhook(client.user.username, {
            avatar: client.user.avatarURL()
        });
        Webhooklar[this.id] = webh;
        result = await webh.send(content, options);
    } else {
        Webhooklar[this.id] = webh;
        result = await webh.send(content, options);
    }
    return result;
};


Guild.prototype.log = async function log(cezano, user, admin, tip, channelName) {
    let channel = this.channels.cache.find(x => x.name === channelName);
    let tur;
    if(tip === "mute") tur = "metin kanallarından susturuldu!"
    if(tip === "vmute") tur = "ses kanallarından susturuldu!"
    if(tip === "jail") tur = "cezalandırıldı!"
    if(tip === "warn") tur = "uyarıldı!"
    if(tip === "ban") tur = "yasaklandı!"
    if (channel) {
        let embed = new MessageEmbed()
          .setAuthor(client.guilds.cache.get(lucy.sunucuID).name, client.guilds.cache.get(lucy.sunucuID).iconURL({dynamic: true, size: 2048})).setColor("RANDOM")
          .setDescription(`${user} üyesi, **${tarihsel(Date.now())}** tarihinde ${admin} tarafından **${cezano.CezaSebebi}** nedeniyle ${tur}`)
          .setFooter(`• Ceza Numarası: #${cezano.CezaNumarasi}`)

        channel.wsend(embed)
    }
}

Guild.prototype.unlog = async function unlog(channelName, uye, yetkili, tip, cezano) {
    let channel = this.channels.cache.find(x => x.name === channelName);
    let tur;
    if(cezano == "x") {
        if(tip == "unban") tur = "yasaklanması"
    } else {
        if(tip == "unban") tur = `\`#${cezano}\` numaralı yasaklanması`
        if(tip == "unjail") tur = `\`#${cezano}\` numaralı cezalandırılması`
        if(tip == "unmute") tur = `\`#${cezano}\` numaralı metin kanallarındaki susturulması`
        if(tip == "unvmute") tur = `\`#${cezano}\` numaralı ses kanallarındaki susturulması`
    }
    if (channel) {
        let embed = new MessageEmbed()
          .setAuthor(client.guilds.cache.get(lucy.sunucuID).name, client.guilds.cache.get(lucy.sunucuID).iconURL({dynamic: true, size: 2048})).setColor("RANDOM")
          .setDescription(`${uye} uyesinin ${tur}, **${tarihsel(Date.now())}** tarihinde ${yetkili} tarafından kaldırıldı.`)
        channel.wsend(embed)
    }
}


