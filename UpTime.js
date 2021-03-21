const Discord = require('discord.js')
const db = require('quick.db') 
const client = new Discord.Client({ disableEveryone: true })
const fetch = require('node-fetch')
const fs = require('fs')
require('express')().listen(1343)
const moment = require('moment')
require('moment-duration-format')
const prefix = 'lg!'

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const DarkCode = Linkler.map(Dark => Dark.url)
DarkCode.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`${client.user.username} | ${db.get('Proje') || 1} Proje Hostandı`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')


  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Dark = new Discord.RichEmbed()
    .setColor('RED')
    .setDescription(`
    **==================================**
    **Link Sistemde Zaten Bulunuyor. ❌** 
    ==================================
    `)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    if(db.get('Linkler').map(Dark => Dark.url).includes(Link)) return message.channel.send(Dark)
    const dark = new Discord.RichEmbed()
    .setColor('GREEN')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`
    **==================================**
    **Yazdığınız URL Başarıyla Eklendi. ✅**
    `)
    .addField(prefix+'linkler','Komutunu Kullanarak Ekledigin Linklere Erisebilirsin')
    .setTimestamp()
    .setImage('https://cdn.discordapp.com/attachments/772568404535410748/772709523814744074/10-30-59-1a97bbf1-c434-4c74-9509-8edc074a79db_standard.gif')
    message.channel.send(dark)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const UpTime = new Discord.RichEmbed()
  .setColor('RED')
  .setDescription(`
  **==================================**
  **Hata: ${Hata} ❌**

  **Lutfen Bir URL Girin**
  ==================================
  `)
  .setImage('https://media.discordapp.net/attachments/748517679119335424/748562753253408920/IMG_20200827_192051.jpg?width=436&height=269')
  .setTimestamp()
  .setThumbnail(message.author.avatarURL)
  message.channel.send(UpTime)
  })
  }

  if(Split[0] == prefix+'davet') {
  const dark1 = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setDescription(`
  **==================================
Beni Sunucuna Eklemek Istemen Beni Sevindiriyor Hemen Altta Linkimi Bula Bilirsin Sen Olmassan 1 kisi eksik

[Ekleme Linkim](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)

[Destek Sunucum](sunucudavetlinki)

[Oy Vermeyi Unutma](https://top.gg/bot/${client.user.id}/vote)
==================================
**`)
  .setThumbnail(message.author.avatarURL)
  .setImage('https://cdn.discordapp.com/attachments/772568404535410748/772709523814744074/10-30-59-1a97bbf1-c434-4c74-9509-8edc074a79db_standard.gif')
  message.channel.send(dark1)
  }

  if(Split[0] == prefix+'i') {
  const dark7 = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
**==================================**
**✅ » Isim -** __${client.user.username}__
**✅ » Kanal Sayısı -** __${client.channels.size}__
**✅ » Sunucu Sayısı -** __${client.guilds.size}__
**✅ » Kullanıcı Sayısı -** __${client.guilds.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**✅ » Link Sayısı -** __${await db.fetch('Proje') || 1}__
**✅ » Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
**==================================**`)
message.channel.send(dark7)
  }
  if(Split[0] == prefix+'istatistik') {
  const dark7 = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
**==================================**
**✅ » Isim -** __${client.user.username}__
**✅ » Kanal Sayısı -** __${client.channels.size}__
**✅ » Sunucu Sayısı -** __${client.guilds.size}__
**✅ » Kullanıcı Sayısı -** __${client.guilds.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
**✅ » Link Sayısı -** __${await db.fetch('Proje') || 1}__
**✅ » Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
**==================================**`)
message.channel.send(dark7)
  }

  if(Split[0] == prefix+'s') {
  const dark2 = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor ✅**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin ✅**
==================================`)
  message.channel.send(dark2)
  }
  if(Split[0] == prefix+'say') {
  const dark2 = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
  ==================================
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor ✅**

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin ✅**
==================================`)
  message.channel.send(dark2)
  }

  if(Split[0] == prefix+'yardım') {
  const dark3 = new Discord.RichEmbed()
  .setColor('#20aaba')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setDescription(`
**Botumuz Uptime Ile Alakalı Bir Botdur**

» Prefixim: **${prefix}**
» Dil: **TR**
`)
  .addField('**» Uptime Bot Komutlari**',`
💛 » [${prefix}link-kaldır](sunucudavetlinki) Link Kaldırmanıza Yarar
💛 » [${prefix}ekle](sunucudavetlinki) Link Eklemenize Yarar
💛 » [${prefix}erişim-kontrol](sunucudavetlinki) Erişim Kontrol
💛 » [${prefix}linkler](sunucudavetlinki) Liklerinizi Gösterir
`)
  .addField('**» Genel Komutlar**',`
💛 » [${prefix}dil](sunucudavetlinki) Botun Dlini Ayarlar
💛 » [${prefix}davet](sunucudavetlinki) Botun Davet Linkini Atar
💛 » [${prefix}istatistik](sunucudavetlinki) Bot Istatistigini Atar
💛 » [${prefix}say](sunucudavetlinki) Total Ve Senin Link Sayini Atar
`)
.addField('**» Destek Sunucum**','[Destek Sunucum](sunucudavetlinki)')
.addField('**» Davet Linkim**','[Beni Davet Et](https://discord.com/oauth2/authorize?client_id='+client.user.id+'&scope=bot&permissions=8)')
.setImage('https://media.discordapp.net/attachments/772568404535410748/772709523814744074/10-30-59-1a97bbf1-c434-4c74-9509-8edc074a79db_standard.gif')
  message.channel.send(dark3)
  }

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Dark => Dark.owner).includes(message.author.id)) return message.channel.send(new Discord.RichEmbed().setColor('#20aaba').setDescription(`**Hiç link eklememişsin. Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.RichEmbed().setColor('#20aaba').setDescription(`**Uptime Etmekte Olduğun Linkler Direkt Mesajlarına Gönderildi . Direkt mesajlarını kontrol et.  ${message.author}**`).setThumbnail(message.author.avatarURL))
    message.author.send(new Discord.RichEmbed().setColor('#20aaba').setDescription(`**» Normal Linklerin:** \n\n\``+Linkleri.join('\n')+`\``).setThumbnail(message.author.avatarURL))
    }

    if(Split[0] == prefix+'dil') {
    const Dil = Split[1]
    if (!Dil) return message.channel.send(`${message.author}, Geçerli bir dil belirtmelisin. 

 **Örnek:** \`${prefix}dil TR\` 

 **DİLLER** 
 \`EN,TR\``)
const dark4 = new Discord.RichEmbed()
.setColor('GREEN')
.setTitle('Dil Değiştirildi.')
.setDescription('Botun dili başarıyla **TÜRKÇE** olarak kaydedildi.')
message.channel.send(dark4).then(x => x.react('✅'))
   }

    if(Split[0] == prefix+'erişim-kontrol') {
const dark5 = new Discord.RichEmbed()
.setColor('#20aaba')
.setThumbnail(message.author.avatarURL)
.setTimestamp()
.setTitle('🎈 Erişim Kontrol')
.setDescription('**» Erişiminiz Aktif**')
message.channel.send(dark5)
}
})




client.on('ready', () => {
client.user.setActivity(`${prefix}yardım | ${prefix}ekle`, { type: 'WATCHING' })
//client.user.setStatus('dnd')
})

client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(![""].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}
client.login('')