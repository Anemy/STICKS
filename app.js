var
    gameport = process.env.PORT || 6333,//4
    //gameport = 'stick-battle.com',

    io              = require('socket.io'),
    express         = require('express'),
    UUID            = require('node-uuid'),

    http            = require('http'),
    https           = require('https'),
    app             = express(),
    server          = http.createServer(app);

var version = 1.01;

server.listen(gameport);//gameport);//, 'stick-battle.com');

console.log('\t Listening on port: ' + gameport );

    //By default, we forward the / path to index.html automatically.
app.get('/', function (req, res) {
    console.log('User loading page. Loading %s', __dirname + '/index.html')
    res.sendfile( '/index.html' , { root:__dirname });
});

app.get( '/*' , function( req, res, next ) {

        //This is the current file they have requested
    var file = req.params[0];

        //Send the requesting client the file.
    res.sendfile( __dirname + '/' + file );

}); //app.get 


//socket io listen to server
var sio = io.listen(server);

    //Configure the socket.io connection settings.
    //See http://socket.io/
sio.configure(function (){

    sio.set('log level', 0);

    sio.set('authorization', function (handshakeData, callback) {
        callback(null, true); // error first callback style
    });

});

game_server = require('./main_server.js');

sio.sockets.on('connection', function (client) {
    //Generate a new UUID
    //and store this on their socket/connection
    client.userid = UUID();

    //Now we want to handle some of the messages that clients will send.
    //They send messages here, and we send them to the game_server to handle.
    client.on('message', function (m) {
        //console.log("Message recieved!! Is it reconnect?!");
        game_server.onMessage(client, m);

    }); //client.on message

        //tell the player they connected, giving them their id
    client.emit('onconnected', { id: client.userid } );

        //now we can find them a game to play with someone.
        //if no game exists with someone waiting, they create one and wait.
    game_server.addDormant(client);
    //was findGame

    //Useful to know when someone connects
    console.log("Player connected! Added to dormant.");
    //console.log('\t socket.io:: player ' + client.userid + ' connected');
        
    client.on('disconnect', function () {

        //Useful to know when soomeone disconnects
        console.log("A client disconnected");

        if(client.game && client.game.id) {
            //player leaving a game should destroy that game
            game_server.endGame(client.game.id, client.userid);
            game_server.removeDormant(client.userid);

        } //client.game_id
        else {
            game_server.removeDormant(client.userid);
        }
    }); //client.on disconnect
     
}); //sio.sockets.on connection
