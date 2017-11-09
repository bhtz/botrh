module.exports = class WelcomeDialog {
    
        constructor(bot, intents) {
            this.bot = bot;
            this.intents = intents;
    
            this.intents.matches('welcome', this.dialog());
        }
    
        dialog() {
            return [(session) => { 
                session.send(`Bonjour je suis BOTRH`);
            }];
        }
    }
    