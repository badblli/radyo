const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  VoiceConnection,
} = require("@discordjs/voice");
const Discord = require("discord.js");
const { Intents, Collection } = Discord;
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.on("ready", async () => {
  joinChannel("946434191485186078");

  function joinChannel(channelId) {
    client.channels.fetch(channelId).then((channel) => {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      const resource = createAudioResource(
        "http://fenomen.listenfenomen.com/fenomen/128/icecast.audio", // buradki linki değişcem ama bura radyoların özel linkleri var onları araştır bul işte offf
        {
          inlineVolume: true,
        }
      );

      resource.volume.setVolume(0.2);
      const player = createAudioPlayer();
      connection.subscribe(player);
      player.play(resource);
      player.on("idle", () => {
        try {
          player.stop();
        } catch (e) {}
        try {
          connection.destroy();
        } catch (e) {}
        joinChannel(channel.id);
      });
    });
  }
});

client.login("");
