//---Les constances
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const config = require("./config.json");
const message = require("./events/message");
client.config = config;

//---Le message de bienvenue
client.on("guildMemberAdd", member => {
    let embedBVN = new Discord.MessageEmbed()
    .setColor("#fe0406")
        .setDescription(`**〖♡〗Bienvenue ${member} dans La Pizza Du RôlePlay, jeune novice ! N'hésite pas a lire les salons de la catégorie "Menu"**.\n☞ Toutes les informations dont vous aurez besoin y sont !\n\n**〖♡〗Plein de rôles plus sympathique les uns que les autres pour votre plaisir sur notre serveur, faites le plein de rôle !**\n☞ Vous les trouverez dans <#741049334908452894> et dans <#741049426335891456> !`)
        .setImage('https://i.pinimg.com/originals/5e/70/e2/5e70e258fbb0cf73a3309a9240f78056.gif')
        .setFooter(`Nous sommes ${member.guild.memberCount}`)
    client.channels.cache.get('741011019148689438').send(embedBVN);
})
//---Le message de leave
client.on("guildMemberRemove", member => {
    client.channels.cache.get('')
})

//---Variables pour le lancement du bot (Console Logs)
var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
var times = (`[${hour}:${minute}:${second}]/`);

//---Configuration de la console + activité du bot et le client.login
client.on('ready', () => {
  console.log(times+`\x1b[33m%s\x1b[0m`,'[WARN]','\x1b[0m','Connexion en cours...');
  console.log(times+`\x1b[33m%s\x1b[0m`,'[WARN]','\x1b[0m','Connexion à l\'API Discord.js en cours...');
  console.log(times+`\x1b[32m%s\x1b[0m`,'[OK]','\x1b[0m', 'Connexion à l\'API Discord.js effectuée');
  console.log(times+`\x1b[36m%s\x1b[0m`,'[INFO]', '\x1b[0m','Connecté sur ' + client.user.username + '#' + client.user.discriminator);
  console.log(times+`\x1b[32m%s\x1b[0m`,'[OK]','\x1b[0m','Chargement terminé');
  console.log(times+`\x1b[32m%s\x1b[0m`,'[OK]','\x1b[0m','Prêt et connecté');


  client.user.setStatus("online");
      client.user.setActivity("p! | La Pizzeria Du RP");
      });


      //---Recherche de tous les events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

// Recherche de toutes les commandes
fs.readdir("./commands/", (err, content) => {
  if(err) console.log(err);
  if(content.length < 1) return console.log('Veuillez créer des dossiers dans le dossier commands !');
  var groups = [];
  content.forEach(element => {
      if(!element.includes('.')) groups.push(element); // Si c'est un dossier
  });
  groups.forEach(folder => {
      fs.readdir("./commands/"+folder, (e, files) => {
          let js_files = files.filter(f => f.split(".").pop() === "js");
          if(js_files.length < 1) return console.log('Veuillez créer des fichiers dans le dossier "'+folder+'" !');
          if(e) console.log(e);
          js_files.forEach(element => {
              let props = require('./commands/'+folder+'/'+element);
              client.commands.set(element.split('.')[0], props);
          });
      });
  });
});



//Clear
client.on("message", message => {

if (message.author.bot) return;

if (message.content.startsWith("p!clear")) {
    // message.delete();
    if (message.member.hasPermission('MANAGE_MESSAGES')) {

        let args = message.content.trim().split(/ +/g);

        if (args[1]) {
            if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {

                message.channel.bulkDelete(args[1])
                message.channel.send(`**✅ | Vous avez supprimé ${args[1]} message(s)**`)
                message.channel.bulkDelete(1)

            }
            else {
                message.channel.send(`**🛑 | Vous devez indiquer une valeur entre 1 et 99 !**`)
            }
        }
        else {
            message.channel.send(`**🛑 | Vous devez indiquer un nombre de messages a supprimer !**`)
        }
    }
    else {
        message.channel.send(`**🛑 | Vous n'avez pas les permissions/autorisations requise pour accomplir cette commande.**`)
    }
}
})

client.login(config.token);