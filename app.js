var express = require("express");
var app = express();
var router = require("./v1/router");
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

io.on('connection', (socket) => {
    var id ;
    socket.on('disconnect', function () {
        io.emit('users-changed', { user: socket.nickname, event: 'left' });
    });
    socket.on('set-nickname', (nickname) => {
        console.log(nickname.id);
        id = 'test'+nickname.id;
        socket.nickname = nickname.user;
        // io.emit('users-changed', { user: nickname, event: 'joined' });
        socket.on(id, (message) => {
            console.log('ms'+id);
            io.emit('ms'+id, { text: message.text, from: socket.nickname, created: new Date() });
      });
    });

    // socket.on('add-message', (message) => {
    //     io.emit('message', { text: message.text, from: socket.nickname, created: new Date() });
    // });
    // socket.on('localtion', (text) => {
    //     console.log(text);
    // });
});

// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

var port = process.env.PORT || 3500;

http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});
// app.listen(3500);


console.log("Started listening at port 3512321300");
router.route(app);
