// note: the permissions bot can only change roles that are below it in the roll list
// permissions bot will also ignore any bot that has an '@' in it (to ignore @everyone)

import Discord from 'discord.js';
const client = new Discord.Client();
import { voiceUpdateHandler } from './voice-channel-manager.js';

client.on('ready', () => {
    console.log('Voice bot engaged!');
});

//initialize the voice channel bot
client.on('voiceStateUpdate', voiceUpdateHandler);

// Log our bot in
client.login(process.env.DPAL_VOICE_BOT_TOKEN);
