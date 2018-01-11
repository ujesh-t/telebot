var TelegramBot = require('node-telegram-bot-api')
    , // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
    telegram = new TelegramBot("522318264:AAGjChUtfMxyz487SngvO4ylCSfSOnXfzL8", {
        polling: true
    });
var request = require('request');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


telegram.onText(/Thank.*Ammu/i, (message) => {
    telegram.sendMessage(message.chat.id, "You are welcome "+message.from.first_name+".");
});


telegram.onText(/\/cex (.+) (.+)/, (message, match) => {

        cexUrl = "https://cex.io/api/ticker/"+match[1]+"/"+match[2];
        console.log('CEX URL >>> '+cexUrl);
        request({
            method: 'GET'
            , uri: cexUrl
            , gzip: true
        }, function (error, response, html) {
            if (!error) {
                var out = JSON.parse(html);
                telegram.sendMessage(message.chat.id, "Highest Ask in CEX is *"+out.ask+"* at the moment!\nLowest Bid is at *"+out.bid+"*\nLast Price on "+out.last,{
                    parse_mode: "Markdown"
                });
            }
            else {
                telegram.sendMessage(message.chat.id, "I am not able to retrieve price at the moment!");
            }
        });
});

telegram.onText(/\/cex.io/, (message, match) => {

        cexUrl = "https://cex.io/api/ticker/BCH/EUR";
        console.log('CEX URL >>> '+cexUrl);
        request({
            method: 'GET'
            , uri: cexUrl
            , gzip: true
        }, function (error, response, html) {
            if (!error) {
                var out = JSON.parse(html);
                telegram.sendMessage(message.chat.id, "Highest Ask in CEX is *"+out.ask+"* at the moment!\nLowest Bid is at *"+out.bid+"*\nLast Price on "+out.last,{
                    parse_mode: "Markdown"
                });
            }
            else {
                telegram.sendMessage(message.chat.id, "I am not able to retrieve price at the moment!");
            }
        });
});

telegram.onText(/\/(cryptopia|crypt) (.+) (.+)/, (message, match) => {
     cryptUrl = "https://www.cryptopia.co.nz/api/GetMarket/"+match[2]+"_"+match[3];
     console.log('Cryptopia URL >>> '+cryptUrl);
     request({
            method: 'GET'
            , uri: cryptUrl
            , gzip: true
        }, function (error, response, html) {
            if (!error) {
                var out = JSON.parse(html);
                console.log(out);
                if(out.Error){
                    telegram.sendMessage(message.chat.id, "I am not able to retrieve price : "+out.Error+"!");
                    return;
                }
                telegram.sendMessage(message.chat.id, match[2]+" - "+match[3]+"\n============== \nHighest Ask in Cryptopia is *"+out.Data.AskPrice+"* at the moment!\nLowest Bid is at *"+out.Data.BidPrice+"*\nLast Price on "+out.Data.LastPrice,{
                    parse_mode: "Markdown"
                });
            }
            else {
                telegram.sendMessage(message.chat.id, "I am not able to retrieve price at the moment!");
                console.error(error);
            }
        });
});

telegram.onText(/\/(bittrex|bitrx) (.+) (.+)/, (message, match) => {
     bitrexUrl = "https://bittrex.com/api/v1.1/public/getticker?market="+match[2]+"-"+match[3];
     console.log('Bittrex URL >>> '+bitrexUrl);
     request({
            method: 'GET'
            , uri: bitrexUrl
            , gzip: true
        }, function (error, response, html) {
            if (!error) {
                var out = JSON.parse(html);
                console.log(out);
                if(out.message){
                    telegram.sendMessage(message.chat.id, "I am not able to retrieve price : "+out.message+"!");
                    return;
                }
                telegram.sendMessage(message.chat.id, match[2]+" - "+match[3]+"\n============== \nHighest Ask in Bittrex is *"+out.result.Ask+"* at the moment!\nLowest Bid is at *"+out.result.Bid+"*\nLast Price on "+out.result.Last,{
                    parse_mode: "Markdown"
                });
            }
            else {
                telegram.sendMessage(message.chat.id, "I am not able to retrieve price at the moment!");
                console.error(error);
            }
        });
});

telegram.onText(/\/bittrex@MyAmmuBot/, (message, match) => {
     bitrexUrl = "https://bittrex.com/api/v1.1/public/getticker?market=BTC-XMG";
     console.log('Bittrex URL >>> '+bitrexUrl);
     request({
            method: 'GET'
            , uri: bitrexUrl
            , gzip: true
        }, function (error, response, html) {
            if (!error) {
                var out = JSON.parse(html);
                console.log(out);
                if(out.message){
                    telegram.sendMessage(message.chat.id, "I am not able to retrieve price : "+out.message+"!");
                    return;
                }
                telegram.sendMessage(message.chat.id, "BTC - XMG\n============== \nHighest Ask in Bittrex is *"+out.result.Ask+"* at the moment!\nLowest Bid is at *"+out.result.Bid+"*\nLast Price on "+out.result.Last,{
                    parse_mode: "Markdown"
                });
            }
            else {
                telegram.sendMessage(message.chat.id, "I am not able to retrieve price at the moment!");
                console.error(error);
            }
        });
});

telegram.onText(/\/cryptopia@MyAmmuBot/, (message, match) => {
     cryptUrl = "https://www.cryptopia.co.nz/api/GetMarket/XMG_BTC";
     console.log('Cryptopia URL >>> '+cryptUrl);
     request({
            method: 'GET'
            , uri: cryptUrl
            , gzip: true
        }, function (error, response, html) {
            if (!error) {
                var out = JSON.parse(html);
                console.log(out);
                if(out.Error){
                    telegram.sendMessage(message.chat.id, "I am not able to retrieve price : "+out.Error+"!");
                    return;
                }
                telegram.sendMessage(message.chat.id, "XMG - BTC\n============== \nHighest Ask in Cryptopia is *"+out.Data.AskPrice+"* at the moment!\nLowest Bid is at *"+out.Data.BidPrice+"*\nLast Price on "+out.Data.LastPrice,{
                    parse_mode: "Markdown"
                });
            }
            else {
                telegram.sendMessage(message.chat.id, "I am not able to retrieve price at the moment!");
                console.error(error);
            }
        });
});

telegram.onText(/\/coindelta (.+)/,(message, match) => {

    coindeltaUrl = "https://coindelta.com/api/v1/public/getticker/";
    var m = match[1].toLowerCase();
    request({
        method: 'GET',
        uri: coindeltaUrl,
        gzip: true
    }, function(error, response, html){
        if(!error){
            var out = JSON.parse(html);
            out.forEach(function(item){
               if(item.MarketName == m+'-inr') {
                    telegram.sendMessage(message.chat.id, m.toUpperCase()+" - INR\n============== \nHighest Ask in CoinDelta is *"+item.Ask+"* at the moment!\nLowest Bid is at *"+item.Bid+"*\nLast Price on "+item.Last,{
                    parse_mode: "Markdown"
                });
                }
            });
        }
    });
    
});
