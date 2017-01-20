import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

/**
 * @author: Andre Amorim <andre.php6@gmail.com>
 * since: 2017-17-01
 **/

var options = {
    headers: {
      	'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
        'Access-Control-Request-Method': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
}

Meteor.methods({
    // Returns the data of a game by its identifier
    'bgg.game' (id) {
        var xml = HTTP.call('GET', 'http://www.boardgamegeek.com/xmlapi/boardgame/'+ id, options);
        obj = converteForJson(xml);
        return obj.boardgames.boardgame;
    },
    // Returns a list of games by means of a textual search in the title of the game
    'bgg.search' (busca) {
        var xmlList = HTTP.call('GET', 'http://www.boardgamegeek.com/xmlapi/search?search=' + busca, options);
        obj = converteForJson(xmlList);
        gameList = obj.boardgames.boardgame;
        var urlChamada = 'http://www.boardgamegeek.com/xmlapi/boardgame/';
        for(var game in gameList) {
            gameId = gameList[game].generic.objectid;
            urlChamada += (gameId + ',');
        }
        xmlGame = HTTP.call('GET', urlChamada, options);
        objGames = converteForJson(xmlGame).boardgames.boardgame;
        for(var game in gameList) {
            gameId = gameList[game].generic.objectid;
            for(var objGame in objGames) {
                if (objGames[objGame].generic.objectid == gameId) {
                    gameList[game].thumbnail = objGames[objGame].thumbnail;
                }
            }
        }
        return gameList;
    }
});

// Converte um schema xml para objeto json
function converteForJson(xml) {
    var obj = null;
    xml2js.parseString(xml.content, {
        charkey: "text",
        attrkey: "generic",
        explicitArray: false
    }, 
    function (err, result) {
        obj = result;
    });
    return obj;
}