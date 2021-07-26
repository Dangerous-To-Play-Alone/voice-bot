/*
Voice chat bot
----------------------------------
this bot adds a copy of the previous voice channel when the user is the first person to join it
this bot deletes any channel when a user leaves it and the channel is now empty
*/

//checks if channel is the current guilds afk channel
function isAfkChannel(voiceState) {
    return voiceState.guild.afkChannelID == voiceState.channelID;
}

//Copies the given channel
function copyChannel(voiceChannel, user) {
    console.log("Cloning " + voiceChannel.name)
    voiceChannel.clone()
        .then(x => console.log(x.name + ' Cloned'))
        .catch(console.error());
}

//Checks weather the new states channel should be copied
//Voice state needed to check if channel is the afk channel
function shouldAddChannel(state) {
    return state && state.channelID && state.channel.members &&
        !isAfkChannel(state) &&
        state.channel.members.size === 1;
}

export function voiceUpdateHandler(oldState, newState) {
    console.log('voice update detected');

    //Only run if new state and old state are actually different
    if (oldState.channelID !== newState.channelID) {

        //add channel if necessary
        if (shouldAddChannel(newState)) {
            copyChannel(newState.channel, newState.member);
        }
        //delete channel if necessary
        if (oldState.channel && !isAfkChannel(oldState) && oldState.channel.members.size === 0) {
            console.log('Deleting ' + oldState.channel.name);
            oldState.channel.delete()
            .then(x => console.log(x.name + ' Deleted'))
                .catch(console.error());
        }
    }
}