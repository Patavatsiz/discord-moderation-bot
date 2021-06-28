const { GuildMember } = require('discord.js');
const lucyDatabase = require('../Functions/lucyDatabase');
const ms = require('ms');

/**
 * @param {GuildMember} member
 */

module.exports = () => {

  setInterval(() => {
    lucyDatabase.cezaTara()
  }, ms(1000));

}

  module.exports.config = {
    Event: "ready"
  }



