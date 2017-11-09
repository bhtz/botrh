var builder = require('botbuilder');
var cognitiveservices = require('botbuilder-cognitiveservices');
var DefaultDialog = require('./dialogs/default.dialog');

class MiaBot {
    
    constructor() {
        //var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/cac0a65b-9aa6-4a44-b22f-6edfbf41642a?subscription-key=0781866b38c5464591e0868a46211cc5&timezoneOffset=0&verbose=true&q=');
        this.connector = new builder.ChatConnector({ appId: '39e9d5ac-5724-4a38-b7ce-a187da5295d9', appPassword: 'zweombU93}#!gBTLWAM591-' });

        this.bot = new builder.UniversalBot(this.connector);
        
        //Send welcome message before user ask
        var bot = this.bot;
        this.bot.on('conversationUpdate', function (message) {
            if (message.membersAdded) {
                message.membersAdded.forEach(function (identity) {
                    if (identity.id === message.address.bot.id) {
                        bot.send(new builder.Message()
                            .address(message.address)
                            .text("Bonjour je suis BOT Interface Manger ! \n\n Posez moi vos questions, je me ferai une joie de vous répondre !"));
                    }
                });
            }
        });

        var recognizer = new cognitiveservices.QnAMakerRecognizer({
            knowledgeBaseId: '51049328-c1f8-4bd8-b2e0-fe5ba7ca0aba', 
            subscriptionKey: '2803fa9b11b04d2a80024a7c5b36156b'});
            
        var basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({
            recognizers: [recognizer],
            defaultMessage: 'C’est étrange, je n’ai trouvé aucune information correspondant à votre recherche. Pouvez-vous réessayer avec d’autres mots clés ?',
            qnaThreshold: 0.3
        });
        
        this.bot.dialog('/', basicQnAMakerDialog);
        
        // this.initDialogs();
    }

    initDialogs(){
        
        this.bot.dialog('/', this.intents);

        new DefaultDialog(this.bot, this.intents);
        new WelcomeDialog(this.bot, this.intents);
    }

    mount(){
        return this.connector;
    }
}

module.exports = new MiaBot().mount();