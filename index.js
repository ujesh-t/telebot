var TelegramBot = require('node-telegram-bot-api'),
    // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
    telegram = new TelegramBot("522318264:AAGjChUtfMxyz487SngvO4ylCSfSOnXfzL8", { polling: true });


telegram.on("text", (message) => {
  if(message.text.toLowerCase().indexOf("/codeday") === 0){
     // clear.getEventById("oo4QIuKQQTYA", (codedayEvent) => {
     // var endsAt = moment(codedayEvent.ends_at * 1000);
     // telegram.sendMessage(message.chat.id, "CodeDay ends " + endsAt.fromNow() + "!");
    });
  }
});