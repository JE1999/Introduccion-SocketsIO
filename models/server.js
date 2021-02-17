const express   = require('express');
const http      = require('http');
const socketio  = require('socket.io');
const path      = require('path');
const cors      = require('cors');

const Sockets   = require('./sockets');

class Server {

    constructor() {    
        this.app    = express();
        this.port   = process.env.PORT;

        //http server
        this.server = http.createServer(this.app)

        //config socket server
        this.io = socketio(this.server, {
            //configuration here!!!
        });
    }

    middlewares() {
        //Deploy public
        this.app.use( express.static ( path.resolve( __dirname, '../public' ) ) );

        //cors
        this.app.use( cors() )
    }

    configSockets() {
        new Sockets(this.io);       
    }

    execute() {
        //Init middlewares
        this.middlewares();

        //Init sockets
        this.configSockets();

        //Init server
        this.server.listen(this.port, () => {
            console.log("Corriendo puerto:", this.port);
        });
    }

}

module.exports = Server;
