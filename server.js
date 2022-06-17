const express = require('express');
const { urlencoded } = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');
const router = require('./routes/products');
const Sockets = require('./socketio');
const app = express();

app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine(
    "hbs",
    handlebars.engine({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir:__dirname+'/views/layouts'
    })

)

app.set('view engine','hbs');
app.set('views','./views')

app.get('/chat', (req, res) => {
    res.render('main');
  });

app.set('port', process.env.PORT || 8080);
app.use('/api', router);

  
const server = app.listen(app.get('port'), () => {
 console.log(`servidor corriendo en puerto 8080`)
});

const io = new Server(server);

Sockets(io);
