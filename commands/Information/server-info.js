const Discord = require('discord.js')

module.exports = {
    name: "s-i", 

    run: async(bot, message, args) => {
        function checkBots(guild) {
            let botCount = 0;
            guild.members.cache.forEach(member => {
                if(member.user.bot) botCount++;
            });
            return botCount;
        }
        
        function checkMembers(guild) {
            let memberCount = 0;
            guild.members.cache.forEach(member => {
                if(!member.user.bot) memberCount++;
            });
            return memberCount;
        }
    
        function checkOnlineUsers(guild) {
            let onlineCount = 0;
            guild.members.cache.forEach(member => {
                if(member.user.presence.status === "online")
                    onlineCount++; 
            });
            return onlineCount;
        }
    
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name} - Informations`, message.guild.iconURL)
            .setColor("#15f153")
            .addField('__Fondateur__', message.guild.owner, true)
            .addField('__Région du serveur__', message.guild.region, true)
            .setThumbnail(sicon)
            .addField("__Nom du serveur__", message.guild.name)
            .addField('__Niveau de verification__', message.guild.verificationLevel, true)
            .addField('__Nombre de channel__', message.guild.channels.cache.size, true)
            .addField('__Total des membres__', message.guild.memberCount)
            .addField('__Humain__', checkMembers(message.guild), true)
            .addField('__ Bots__', checkBots(message.guild), true)
            .addField('__Online__', checkOnlineUsers(message.guild))
            .setFooter('Serveur crée le :')
            .setTimestamp(message.guild.createdAt);
    
        return message.channel.send(serverembed);
    }
}