const {Guild, Message} = require('discord.js');
const {JsonDatabase} = require('wio.db');
const yasakTag = new JsonDatabase({databasePath:'./Source/Databases/YasakTag.json'});
const sdb = new JsonDatabase({databasePath:'./Source/Databases/Sicil.json'});
const cdb = new JsonDatabase({databasePath:'./Source/Databases/Cezalar.json'});
const udb = new JsonDatabase({databasePath:'./Source/Databases/Users.json'});
const edb = new JsonDatabase({databasePath: './Source/Databases/Ekip.json'});
const rdb = new JsonDatabase({databasePath: './Source/Databases/Rol.json'});
const ms = require('ms');

class lucyDatabase {

  static cezaEkle(uye, yetkili, cezaturu, cezanumarasi, cezasuresi, cezabitistarihi, cezasebebi) {
    let cezano = cezanumarasi
let arr = {
  CezaNumarasi: cezano,
  Uye: uye.id,
  Yetkili: yetkili.id,
  CezaTuru: cezaturu,
  CezaSuresi: cezasuresi,
  CezaTarihi: Date.now(),
  CezaBitisTarihi: cezabitistarihi,
  CezaSebebi: cezasebebi,
  Aktiflik: true
};

cdb.set(`cezalar.${cezano}`, arr);
sdb.push(`kullanici.${uye.id}.cezalar`, arr);
if(cezaturu === "tempjail") {
  cdb.push(cezaturu, {UserID: uye.id, PenalityID: cezano, bitis: Date.now()+ms(cezasuresi)});
  udb.add(`kullanici.${yetkili.id}.tjail`, 1)
  udb.add(`kullanici.${uye.id}.cezapuan`, 20)
} else if(cezaturu === "mute") {
  cdb.push(cezaturu, {UserID: uye.id, PenalityID: cezano, bitis: Date.now()+ms(cezasuresi)});
  udb.add(`kullanici.${yetkili.id}.mute`, 1)
  udb.add(`kullanici.${uye.id}.cezapuan`, 10)
} else if(cezaturu === "vmute") {
  cdb.push(cezaturu, {UserID: uye.id, PenalityID: cezano, bitis: Date.now()+ms(cezasuresi)});
  udb.add(`kullanici.${yetkili.id}.vmute`, 1)
  udb.add(`kullanici.${uye.id}.cezapuan`, 10)
} else if(cezaturu === "ban") {
  udb.add(`kullanici.${yetkili.id}.ban`, 1)
  udb.add(`kullanici.${uye.id}.cezapuan`, 30)
} else if(cezaturu === "jail") {
  cdb.push("jail", `j${uye.id}`);
  udb.add(`kullanici.${yetkili.id}.jail`, 1)
  udb.add(`kullanici.${uye.id}.cezapuan`,
   20)
} else if(cezaturu === "warn") {
  udb.add(`kullanici.${yetkili.id}.warn`, 1)
  udb.add(`kullanici.${uye.id}.cezapuan`, 3)
}

cdb.add(`cezano.${lucy.sunucuID}`, 1)

  };

static kb(uye, cezaturu) {
  if(cezaturu == "tempjail") return udb.get(`kullanici.${uye.id}.tjail`) || 0;
  if(cezaturu == "mute") return udb.get(`kullanici.${uye.id}.mute`) || 0;
  if(cezaturu == "vmute") return udb.get(`kullanici.${uye.id}.vmute`) || 0;
  if(cezaturu == "ban") return udb.get(`kullanici.${uye.id}.ban`) || 0;
  if(cezaturu == "jail") return udb.get(`kullanici.${uye.id}.jail`) || 0;
  if(cezaturu == "warn") return udb.get(`kullanici.${uye.id}.warn`) || 0;
};

static cezaPuan(uye) {
  var res = udb.fetch(`kullanici.${uye.id}.cezapuan`) || 0;
  return res;
};

static cezaNo(){
  var res = cdb.get(`cezano.${lucy.sunucuID}`);
  return res;
};

static cezaGetir(uye){
  var res = sdb.get(`kullanici.${uye.id}.cezalar`);
  return res;
};

static cezaBilgi(no) {
  var res = cdb.fetch(`cezalar.${no}`)
  return res;
};

static sicilS??f??rla(uye) {
  udb.delete(`kullanici.${uye.id}.cezapuan`)
  sdb.delete(`kullanici.${uye.id}.cezalar`)
};

static muteGetir(tur) {
let muteler = cdb.get(tur) || [];
return muteler;
};
static smuteGetir(tur) {
let sesmuteler = cdb.get(tur) || [];
return sesmuteler;
};
static jailGetir(tur) {
let jailgetir =  cdb.get(tur) || [];
return jailgetir;
};
static yasakTagGetir(tur) {
let yasakTagli = yasakTag.get(tur) || [];
return yasakTagli;
};
static yasakTagEkle(tag) {
  yasakTag.push('yasakTaglar', tag);
};
static yasakTagliEkle(??yeid) {
yasakTag.push('yasakTaglilar', `y${??yeid}`);
};
static yasakTagKald??r(tag) {
  let data = yasakTag.get('yasakTaglar') || [];
  yasakTag.set('yasakTaglar', data.filter(s => s !== tag))
};
static yasakTagTara() {
  var res = yasakTag.get('yasakTaglar') || [];
  return res;
}
static yasakTagliKald??r(uye) {
 	let yasakTaglilar = yasakTag.get('yasakTaglilar') || [];
yasakTag.set('yasakTaglilar', yasakTaglilar.filter(x => !x.includes(uye.id)));
};
static yasakTagCheck(uye) {
let yasakTaglilar = yasakTag.get('yasakTaglilar') || [];
yasakTag.set("yasakTaglilar", yasakTaglilar.filter(x => !x.includes(uye.id)));
};
static MuteKaldir(no) {
  cdb.set(`cezalar.${no}.Aktiflik`, false)
  cdb.set(`cezalar.${no}.CezaBitisTarihi`, Date.now())
};
static vMuteKaldir(no) {
  cdb.set(`cezalar.${no}.Aktiflik`, false)
  cdb.set(`cezalar.${no}.CezaBitisTarihi`, Date.now())
};
static sJailKaldir(no) {
  cdb.set(`cezalar.${no}.Aktiflik`, false)
  cdb.set(`cezalar.${no}.CezaBitisTarihi`, Date.now())
};
static banKaldir(no) {
  cdb.set(`cezalar.${no}.Aktiflik`, false)
  cdb.set(`cezalar.${no}.CezaBitisTarihi`, Date.now())
};

static cezaTara() {
  let taglar = lucy.yasakTaglar || [];
  let yasakTaglilar = cdb.get(`yasakTaglilar`) || [];
  let tempjail = cdb.get(`tempjail`) || [];
  let mute = cdb.get(`mute`) || [];
  let vmute = cdb.get(`vmute`) || [];
  for(let kisi of yasakTaglilar) {
    let uye = client.guilds.cache.get(lucy.sunucuID).members.cache.get(kisi.slice(1));
    if(uye && taglar.some(x => uye.user.username.includes(x)) && !uye.roles.cache.has(lucy.roller.yasakl??TagRol??)) uye.roles.set(uye.roles.cache.has(lucy.roller.boosterRol??) ? [lucy.roller.boosterRol??, lucy.roller.yasakl??TagRol??] : [lucy.roller.yasakl??TagRol??]);
    if(uye && !taglar.some(x => uye.user.uername.includes(x)) && uye.roles.cache.has(lucy.roller.yasakl??TagRol??)) {
      yasakTag.set("yasakTaglilar", yasakTaglilar.filter(x => !x.includes(uye.id)))
      uye.rolTan??mla(lucy.roller.yasakl??TagRol??)
    };
  };

  for(let ceza of tempjail) {
    let uye = client.guilds.cache.get(lucy.sunucuID).members.cache.get(ceza.id);
    if(Date.now() >= ceza.bitis) {
      cdb.set("tempjail", tempjail.filter(x => x.id !== ceza.id));
      if(uye && uye.roles.cache.has(lucy.roller.jailRol??)) {
        return;
      } else {
        uye.rolTan??mla(lucy.roller.jailRol??)
      };
      udb.set(`ceza.${ceza.PenalityID}.Aktif`, false);
      udb.set(`ceza.${ceza.PenalityID}.BitisZaman`, Date.now());
    } else {
      if(uye && !uye.roles.cache.has(lucy.roller.jailRol??)) uye.roles.set(uye.roles.cache.has(lucy.roller.boosterRol??) ? [lucy.roller.boosterRol??, lucy.roller.jailRol??] : [lucy.roller.jailRol??])
    };
  };

  for(let ceza of mute) {
    let uye = client.guilds.cache.get(lucy.sunucuID).members.cache.get(ceza.id);
    if(Date.now() >= ceza.bitis) {
      cdb.set("mute", mute.filter(x => x.id !== ceza.id));
      if(uye && uye.roles.cache.has(lucy.roller.muteRol??)) uye.roles.remove(lucy.roller.muteRol??);
      udb.set(`ceza.${ceza.PenalityID}.Aktif`, false);
      udb.set(`ceza.${ceza.PenalityID}.BitisZaman`, Date.now());
    } else {
      if(uye && !uye.roles.cache.has(lucy.roller.muteRol??)) uye.roles.add(lucy.roller.muteRol??);
    };
  };

  for(let ceza of vmute) {
    let uye = client.guilds.cache.get(lucy.sunucuID).members.cache.get(ceza.id);
    if(Date.now() >= ceza.bitis) {
      cdb.set("vmute", vmute.filter(x => x.id !== ceza.id));
      if(uye) uye.roles.remove(lucy.roller.vmuteRol??);
      if(uye && uye.voice.channel) uye.voice.setMute(false);
      udb.set(`ceza.${ceza.PenalityID}.Aktif`, false);
      udb.set(`ceza.${ceza.PenalityID}.BitisZaman`, Date.now());
    } else {
      if(uye) uye.roles.add(lucy.roller.vmuteRol??);
    };
  };
};


static async ekipEkle(rolename, rolecolor, rolepermission, ekiptagi, ekiptagi2) {
let sunucu = client.guilds.cache.get(lucy.sunucuID);
let role = await sunucu.roles.create({
  data: {
    name: rolename,
    color: rolecolor,
    permissions: rolepermission
  }
});
  edb.push(`ekip.${lucy.sunucuID}`, role.id)

  await sunucu.members.cache.filter(x => x.user.username.includes(ekiptagi) || x.user.discriminator.includes(ekiptagi2)).forEach(x => x.roles.add(role))

};

static ekipCek() {
 var res = edb.get(`ekip.${lucy.sunucuID}`) || [];
 return res;
};

static ekipSil(rol) {
  let data = edb.get(`ekip.${lucy.sunucuID}`) || [];
  edb.set(`ekip.${lucy.sunucuID}`, data.filter(s => s !== rol.id))
}

  static roleAdd(member, role, date, author) {
    rdb.push(`kullanici.${member}.rollog`, {
      Push: `${lucy.emojiler.yes} Rol Verildi. Rol: ${role} Yetkili: ${author}\nTarih: ${date}\n?????????????????????????????????????????????????????????????????????`
    })
  }

  static roleRemove(member, role, date, author) {
    rdb.push(`kullanici.${member}.rollog`, {
      Push: `${lucy.emojiler.no} Rol Al??nd??. Rol: ${role} Yetkili: ${author}\nTarih: ${date}\n?????????????????????????????????????????????????????????????????????`
    })
  }

  static rolCek(member) {
    let cek = rdb.get(`kullanici.${member}.rollog`) || [];
    return cek;
  }

};

module.exports = lucyDatabase