const TicTacToe = require('discord-tictactoe');
require('dotenv').config();
const Discord = require('discord.js');
const {letterTrans}=require('custom-translate');
const encodex= require('./dictx.json')
const decodex= require('./dicty.json')
const { prefix, token, giphyToken} = require ( './config.json');
const client =  new Discord.Client();
const game = new TicTacToe({ language: 'en' })

client.on('ready', ()=>{
    console.log("ready!")
})

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

client.on('ready', ()=>{
    client.user.setActivity("HAPPY PRIDE MONTH🌈🌈");
    })

client.on('message', message=>{
    console.log(message.content);
    
    if(message.content.startsWith(`${prefix}bonk`)){
        let member = message.mentions.members.first();
        giphy.search('gifs', { "q": "bonk head" })
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex=Math.floor((Math.random()*10)+1) % totalResponses;
                var responseFinal=response.data[responseIndex]

                message.channel.send("bonks "+member.displayName, {tts: true} );
                message.channel.send({files: [responseFinal.images.fixed_height.url]});
            })
        }
    else if(message.content.startsWith(`${prefix}gif`)){
        var str = message.content;
        var res = str.slice(4);
        console.log(res);
        giphy.search('gifs', { "q": res })
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex=Math.floor((Math.random()*10)+1) % totalResponses;
                var responseFinal=response.data[responseIndex]
                message.channel.send({files: [responseFinal.images.fixed_height.url]})
            })
        }
    else if(message.content=="%toss"){
        var head=1;
        tail=2;
        var toss=Math.random()*2;
        var floorno=Math.floor(toss)
        if(floorno === 0){
            message.channel.send("BONKKKK Random Coin Value: Head")
        } else if(floorno === 1)
        {
            message.channel.send("BONKKKK Random Coin Value: Tails")
        }
    }
    else if (message.content.startsWith('-tictactoe')) {
        game.handleMessage(message);
      }
    else if(message.content.startsWith(`${prefix}help`)){
          message.channel.send(">>> prefix: %;\n%bonk to bonk someone with gif and tts\n%toss to simulate a coin flip\n-tictactoe to play tictactoe\n%gif to search a gif\n%crow to translate a text into crow language\n%uncrow to convert crow language back to English")
    }
    else if(message.content.startsWith(`${prefix}crow`)){
        var str = message.content;
        var res = str.slice(6);
        var newstr= letterTrans(res,encodex,"")
        message.channel.send(newstr)
    }
    else if(message.content.startsWith(`${prefix}uncrow`)){
        var str = message.content
        var res = str.slice(8)
        var newstr= letterTrans(res,decodex,"")
        message.channel.send(newstr)
    }
    else if(message.content.includes(`${prefix}changeNick`)) {
       message.member.setNickname(message.content.replace('%changeNick ', ''));
    }
})
client.login(token)