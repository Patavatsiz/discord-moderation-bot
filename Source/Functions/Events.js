class Events {
    static fetchEvent(fileName) {
        let referans = require(`../Events/${fileName}`);
        global.client.on(referans.config.Event, referans);
        console.log('\x1b[32m%s\x1b[0m', `[ Lucy Events ] ${fileName} yüklendi.`);
    }
}

module.exports = Events;