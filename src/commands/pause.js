module.exports = {
    name: "pause",
    category: "music",
    async execute(client, msg) {
        const str = client.languages.get(msg.guild.language).commands.pause
        const musicStr = client.languages.get(msg.guild.language).music
        let serverQueue = client.queue.get(msg.guild.id)
        if (!serverQueue) return msg.reply(musicStr.queueEmpty)
        if (!msg.member.voice.channel) return msg.reply(musicStr.noVc)
        let vc = await msg.member.voice.channel.fetch()
        if (serverQueue.voiceChannel.id !== vc.id) return msg.reply(musicStr.notSameVc)
        if (serverQueue.player.paused) return msg.reply(str.alreadyPaused)
        serverQueue.player.setPaused(true)
        msg.reply(str.success)
    }
}