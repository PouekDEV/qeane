module.exports = {
    name: "tag",
    category: "moderation",
    async execute(client, msg) {
        let str = client.languages.get(msg.guild.language).commands.tag
        if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.reply(str.noPerms)
        switch (msg.args[0]) {
            case "create":
                msg.args = msg.args.slice(1)
                if (!msg.args[0]) return msg.reply(str.create.noName)
                if (!msg.args[1]) return msg.reply(str.create.noDesc)
                let content = msg.args.slice(1).join(' ')
                if (content.length >= 2000) return msg.reply(str.create.descTooBog)
                client.db.set(`tags.${msg.guild.id}.${msg.args[0]}`, content)
                msg.reply(str.create.success)
                break;
            case "delete":
                msg.args = msg.args.slice(1)
                if (!msg.args[0]) return msg.reply(str.delete.noName)
                if (!client.db.has(`tags.${msg.guild.id}.${msg.args[0]}`)) return msg.reply(str.invalidTag)
                client.db.delete(`tags.${msg.guild.id}.${msg.args[0]}`)
                msg.reply(str.delete.success)
                break;
            case "list":
                let tags = client.db.get(`tags.${msg.guild.id}`)
                if (!tags) return msg.reply(str.list.noTag)
                let list = Object.keys(tags).join(', ')
                msg.reply("", {
                    embed: {
                        description: list,
                        title: str.list.list
                    }
                })
                break;
            default:
                msg.reply(str.usage)
                break;
        }
    }
}
