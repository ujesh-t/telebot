var TelegramBot = require('node-telegram-bot-api')
    , // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
    telegram = new TelegramBot("522318264:AAGjChUtfMxyz487SngvO4ylCSfSOnXfzL8", {
        polling: true
    });
var request = require('request');

telegram.on("text", (message) => {
    if (message.text.toLowerCase().indexOf("/cex") === 0) {
        // clear.getEventById("oo4QIuKQQTYA", (codedayEvent) => {
        // var endsAt = moment(codedayEvent.ends_at * 1000);
        // telegram.sendMessage(message.chat.id, "CodeDay ends " + endsAt.fromNow() + "!");
        //});
        cexUrl = "https://cex.io/api/ticker/BCH/EUR";
        request({
            method: 'GET'
            , uri: cexUrl
            , gzip: true
        }, function (error, response, html) {
            if (!error) {
                var out = JSON.parse(html);
                //output.cex_buy = out.ask;
                //output.cex_sell = out.bid;
                telegram.sendMessage(message.chat.id, "Highest Ask in CEX is *"+out.ask+"* at the moment!\nLowest Bid is at *"+out.bid+"*\nLast Price on "+out.last,{
                    parse_mode: "Markdown"
                });
            }
            else {
                telegram.sendMessage(message.chat.id, "I am not able to retrieve price at the moment!");
            }
        });
    
    
}
});