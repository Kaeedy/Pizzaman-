const Discord = require("discord.js");
const moment = require('moment')

module.exports.run =async (bot, message, args) => {
    let inline = true
    let resence = true
    const status = {
        online: "Online",
        idle: "Inactif",
        dnd: "Ne pas déranger",
        offline: "Offline/Invisible"
      }
  
        
const member = message.mentions.members.first() || message.member;
let target = message.mentions.users.first() || message.author

const joineddate = moment.utc(member.joinedAt).format("DD-MM-YYYY"); //MMM/dddd/yyyy
let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
const joined = Math.floor(y / 86400000);

if (member.user.bot === true) {
    bot = "Oui";
  } else {
    bot = "Non";
  }

            let embed = new Discord.MessageEmbed()
                //.setAuthor(member.user.username)
                .setColor("#00ff00")
                .setTitle(`*${target.tag}*`)
                .setThumbnail(`${target.displayAvatarURL({dynamic: true})}`)
                .addField("__Pseudonyme__", `${member.user.tag}`, inline)
                .addField("__ID__", member.user.id, inline)
                .addField("__Surnom__", `${member.nickname !== null ? `${member.nickname}` : "Non"}`, true)
                .addField("__Bot ?__", `${bot}`,inline, true)
                .addField("__Rôles__", `<@&${member._roles.join('> <@&')}>`)
                .addField("__Statut__", `${status[member.user.presence.status]}`, inline, true)
                .addField("__A rejoint le serveur le ?__", `${joineddate} \n> Est sur le serveur depuis : ${joined} jour(s)`)
                .addField("__Compte crée le__", member.user.createdAt)
                .setFooter(`Information sur ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

    }

    module.exports.help = {
        name: "userinfo"
    }